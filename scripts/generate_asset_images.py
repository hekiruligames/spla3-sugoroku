#!/usr/bin/env python3

import hashlib
import json
import shutil
import struct
import subprocess
import tempfile
import zlib
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
MANIFEST_PATH = ROOT / "data" / "raw-manifest.json"
CROP_CONFIG_PATH = ROOT / "data" / "crop-config.json"
RAW_ROOT = ROOT / "raw" / "screenshots"
ASSETS_ROOT = ROOT / "assets"
WEAPONS_DIR = ASSETS_ROOT / "weapons"
SUBS_DIR = ASSETS_ROOT / "subs"
SPECIALS_DIR = ASSETS_ROOT / "specials"
SUB_HASH_THRESHOLD = 8
SPECIAL_HASH_THRESHOLD = 12


def load_json(path):
    with path.open("r", encoding="utf-8") as fh:
        return json.load(fh)


def list_pngs(category):
    category_dir = RAW_ROOT / category
    return sorted(
        path for path in category_dir.iterdir() if path.is_file() and path.suffix.lower() == ".png"
    )


def resolve_source_path(item, cache):
    category = item["category"]
    if category not in cache:
        cache[category] = list_pngs(category)
    return cache[category][item["categoryOrder"] - 1]


def reset_directory(path):
    if path.exists():
        shutil.rmtree(path)
    path.mkdir(parents=True, exist_ok=True)


def crop_image(source_path, region, output_path):
    output_path.parent.mkdir(parents=True, exist_ok=True)
    command = [
        "sips",
        "-c",
        str(region["height"]),
        str(region["width"]),
        "--cropOffset",
        str(region["y"]),
        str(region["x"]),
        str(source_path),
        "--out",
        str(output_path),
    ]
    subprocess.run(command, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)


def sha256_of_png_pixels(path):
    data = path.read_bytes()
    if not data.startswith(b"\x89PNG\r\n\x1a\n"):
        raise ValueError(f"PNG ではありません: {path}")

    pos = 8
    ihdr = None
    idat_parts = []

    while pos < len(data):
        length = struct.unpack(">I", data[pos : pos + 4])[0]
        pos += 4
        chunk_type = data[pos : pos + 4]
        pos += 4
        chunk_data = data[pos : pos + length]
        pos += length + 4

        if chunk_type == b"IHDR":
            ihdr = chunk_data
        elif chunk_type == b"IDAT":
            idat_parts.append(chunk_data)
        elif chunk_type == b"IEND":
            break

    if ihdr is None:
        raise ValueError(f"IHDR がありません: {path}")

    raw_pixels = zlib.decompress(b"".join(idat_parts))
    digest = hashlib.sha256()
    digest.update(ihdr)
    digest.update(raw_pixels)
    return digest.hexdigest()


def decode_png_rows(path):
    data = path.read_bytes()
    if not data.startswith(b"\x89PNG\r\n\x1a\n"):
        raise ValueError(f"PNG ではありません: {path}")

    pos = 8
    ihdr = None
    idat_parts = []

    while pos < len(data):
        length = struct.unpack(">I", data[pos : pos + 4])[0]
        pos += 4
        chunk_type = data[pos : pos + 4]
        pos += 4
        chunk_data = data[pos : pos + length]
        pos += length + 4

        if chunk_type == b"IHDR":
            ihdr = chunk_data
        elif chunk_type == b"IDAT":
            idat_parts.append(chunk_data)
        elif chunk_type == b"IEND":
            break

    if ihdr is None:
        raise ValueError(f"IHDR がありません: {path}")

    width, height, bit_depth, color_type, _, _, _ = struct.unpack(">IIBBBBB", ihdr)
    channels = {0: 1, 2: 3, 3: 1, 4: 2, 6: 4}[color_type]
    bytes_per_pixel = channels * (bit_depth // 8)
    stride = width * bytes_per_pixel
    raw = zlib.decompress(b"".join(idat_parts))

    rows = []
    index = 0
    previous = bytearray(stride)

    def paeth(a, b, c):
        p = a + b - c
        pa = abs(p - a)
        pb = abs(p - b)
        pc = abs(p - c)
        if pa <= pb and pa <= pc:
            return a
        if pb <= pc:
            return b
        return c

    for _ in range(height):
        filter_type = raw[index]
        index += 1
        row = bytearray(raw[index : index + stride])
        index += stride

        if filter_type == 1:
            for x in range(stride):
                row[x] = (row[x] + (row[x - bytes_per_pixel] if x >= bytes_per_pixel else 0)) & 255
        elif filter_type == 2:
            for x in range(stride):
                row[x] = (row[x] + previous[x]) & 255
        elif filter_type == 3:
            for x in range(stride):
                left = row[x - bytes_per_pixel] if x >= bytes_per_pixel else 0
                row[x] = (row[x] + ((left + previous[x]) // 2)) & 255
        elif filter_type == 4:
            for x in range(stride):
                left = row[x - bytes_per_pixel] if x >= bytes_per_pixel else 0
                up = previous[x]
                upper_left = previous[x - bytes_per_pixel] if x >= bytes_per_pixel else 0
                row[x] = (row[x] + paeth(left, up, upper_left)) & 255

        rows.append(bytes(row))
        previous = row

    return width, height, channels, rows


def average_hash_of_png(path, size=12):
    width, height, channels, rows = decode_png_rows(path)
    values = []

    for grid_y in range(size):
        sample_y = min(height - 1, int((grid_y + 0.5) * height / size))
        row = rows[sample_y]
        for grid_x in range(size):
            sample_x = min(width - 1, int((grid_x + 0.5) * width / size))
            pixel_index = sample_x * channels
            red = row[pixel_index]
            green = row[pixel_index + 1] if channels > 1 else red
            blue = row[pixel_index + 2] if channels > 2 else red
            values.append((red * 299 + green * 587 + blue * 114) // 1000)

    average = sum(values) / len(values)
    bits = 0
    for value in values:
        bits = (bits << 1) | (1 if value >= average else 0)
    return bits


def popcount(value):
    return bin(value).count("1")


def generate_weapon_images(manifest, crop_config, screenshot_cache):
    region = crop_config["regions"]["weapon"]
    for item in manifest["items"]:
        source_path = resolve_source_path(item, screenshot_cache)
        output_name = f"{item['globalOrder']:03d}-{item['category']}-{item['categoryOrder']:02d}.png"
        crop_image(source_path, region, WEAPONS_DIR / output_name)


def generate_unique_region_images(manifest, crop_config, region_name, output_dir, screenshot_cache):
    region = crop_config["regions"][region_name]
    pixel_digest_to_name = {}
    representatives = []
    counter = 1
    threshold = SUB_HASH_THRESHOLD if region_name == "sub" else SPECIAL_HASH_THRESHOLD

    with tempfile.TemporaryDirectory(prefix=f"spla3-{region_name}-") as temp_dir_name:
        temp_dir = Path(temp_dir_name)

        for item in manifest["items"]:
            source_path = resolve_source_path(item, screenshot_cache)
            temp_output = temp_dir / f"{item['globalOrder']:03d}.png"
            crop_image(source_path, region, temp_output)
            pixel_digest = sha256_of_png_pixels(temp_output)

            if pixel_digest in pixel_digest_to_name:
                continue

            image_hash = average_hash_of_png(temp_output)
            if any(popcount(image_hash ^ rep_hash) <= threshold for rep_hash in representatives):
                continue

            output_name = f"{counter:03d}.png"
            shutil.copy2(temp_output, output_dir / output_name)
            pixel_digest_to_name[pixel_digest] = output_name
            representatives.append(image_hash)
            counter += 1

    return len(representatives)


def main():
    manifest = load_json(MANIFEST_PATH)
    crop_config = load_json(CROP_CONFIG_PATH)

    reset_directory(WEAPONS_DIR)
    reset_directory(SUBS_DIR)
    reset_directory(SPECIALS_DIR)
    screenshot_cache = {}

    generate_weapon_images(manifest, crop_config, screenshot_cache)
    unique_subs = generate_unique_region_images(manifest, crop_config, "sub", SUBS_DIR, screenshot_cache)
    unique_specials = generate_unique_region_images(manifest, crop_config, "special", SPECIALS_DIR, screenshot_cache)

    summary = {
        "weapons": len(list(WEAPONS_DIR.glob("*.png"))),
        "subs": unique_subs,
        "specials": unique_specials,
        "dedupeThresholds": {
            "subs": SUB_HASH_THRESHOLD,
            "specials": SPECIAL_HASH_THRESHOLD,
        },
        "outputDirs": {
            "weapons": WEAPONS_DIR.relative_to(ROOT).as_posix(),
            "subs": SUBS_DIR.relative_to(ROOT).as_posix(),
            "specials": SPECIALS_DIR.relative_to(ROOT).as_posix(),
        },
    }
    print(json.dumps(summary, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
