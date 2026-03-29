#!/usr/bin/env python3

import json
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CATEGORY_ORDER_PATH = ROOT / "category-order-ja.json"
RAW_ROOT = ROOT / "raw" / "screenshots"
OUTPUT_PATH = ROOT / "data" / "raw-manifest.json"
ALLOWED_CATEGORIES = [
    "shooter",
    "roller",
    "charger",
    "spinner",
    "maneuver",
    "slosher",
    "shelter",
    "blaster",
    "brush",
    "stringer",
    "wiper",
]


def load_category_order():
    with CATEGORY_ORDER_PATH.open("r", encoding="utf-8") as fh:
        data = json.load(fh)
    if list(data.keys()) != ALLOWED_CATEGORIES:
        raise SystemExit("category-order-ja.json のカテゴリ順が想定と異なります。")
    return data


def list_pngs(category):
    category_dir = RAW_ROOT / category
    if not category_dir.exists():
        raise SystemExit(f"スクリーンショットフォルダがありません: {category}")
    return sorted(
        path for path in category_dir.iterdir() if path.is_file() and path.suffix.lower() == ".png"
    )


def build_manifest():
    category_order = load_category_order()
    items = []
    counts = {}
    global_order = 1

    for category in ALLOWED_CATEGORIES:
        weapon_names = category_order[category]
        screenshots = list_pngs(category)
        if len(weapon_names) != len(screenshots):
            raise SystemExit(
                f"{category} の件数不一致: json={len(weapon_names)} screenshots={len(screenshots)}"
            )

        counts[category] = len(weapon_names)

        for category_order_index, (weapon_name_ja, screenshot_path) in enumerate(
            zip(weapon_names, screenshots), start=1
        ):
            is_baseline = category == "shooter" and category_order_index == 1
            items.append(
                {
                    "globalOrder": global_order,
                    "category": category,
                    "categoryOrder": category_order_index,
                    "weaponNameJa": weapon_name_ja,
                    "isBaseline": is_baseline,
                }
            )
            global_order += 1

    ignored_folders = sorted(
        path.name for path in RAW_ROOT.iterdir() if path.is_dir() and path.name not in ALLOWED_CATEGORIES
    )

    return {
        "version": 2,
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "sourceOfTruth": {
            "categoryOrderFile": CATEGORY_ORDER_PATH.relative_to(ROOT).as_posix(),
            "screenshotsRoot": RAW_ROOT.relative_to(ROOT).as_posix(),
            "allowedCategories": ALLOWED_CATEGORIES,
            "ignoredScreenshotFolders": ignored_folders,
        },
        "baseline": {
            "category": "shooter",
            "categoryOrder": 1,
        },
        "counts": counts,
        "totalWeapons": len(items),
        "items": items,
    }


def main():
    manifest = build_manifest()
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    with OUTPUT_PATH.open("w", encoding="utf-8") as fh:
        json.dump(manifest, fh, ensure_ascii=False, indent=2)
        fh.write("\n")


if __name__ == "__main__":
    main()
