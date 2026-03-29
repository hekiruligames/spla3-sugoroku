#!/usr/bin/env python3

import argparse
import json
import shutil
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
MANIFEST_PATH = ROOT / "data" / "raw-manifest.json"
CROP_CONFIG_PATH = ROOT / "data" / "crop-config.json"
RAW_ROOT = ROOT / "raw" / "screenshots"


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


def run_crop(source_path, region, output_path):
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


def main():
    parser = argparse.ArgumentParser(description="preview crop を数件だけ生成します。")
    parser.add_argument("--limit", type=int, default=5, help="切り出す件数")
    parser.add_argument(
        "--output-dir",
        required=True,
        help="preview 出力先ディレクトリ",
    )
    args = parser.parse_args()

    manifest = load_json(MANIFEST_PATH)
    crop_config = load_json(CROP_CONFIG_PATH)
    output_dir = Path(args.output_dir).expanduser().resolve()
    if output_dir.exists():
        shutil.rmtree(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    preview_index = []
    screenshot_cache = {}

    for item in manifest["items"][: args.limit]:
        item_dir = output_dir / f"{item['globalOrder']:03d}-{item['category']}-{item['categoryOrder']:02d}"
        source_path = resolve_source_path(item, screenshot_cache)

        for region_name, region in crop_config["regions"].items():
            run_crop(source_path, region, item_dir / f"{region_name}.png")

        preview_index.append(
            {
                "globalOrder": item["globalOrder"],
                "category": item["category"],
                "categoryOrder": item["categoryOrder"],
                "weaponNameJa": item["weaponNameJa"],
                "previewFolder": item_dir.name,
            }
        )

    with (output_dir / "preview-index.json").open("w", encoding="utf-8") as fh:
        json.dump({"limit": min(args.limit, len(manifest["items"])), "items": preview_index}, fh, ensure_ascii=False, indent=2)
        fh.write("\n")


if __name__ == "__main__":
    main()
