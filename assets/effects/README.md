# 攻撃・塗装・移動エフェクト素材

Issue #8「キャラクターがマスのタイプに応じて道を攻撃・塗装して移動する演出」で使用している本番素材と、現行実装の仕様をまとめています。

## 実装状況

Issue #8 は PR #10 で実装済みです。

現在の移動は、移動開始時のマスから攻撃タイプを1回決定し、移動区間ごとに次の状態を進めます。

```text
IDLE → WINDUP → ATTACK → PAINT → MOVE → LANDING → IDLE
```

複数マス移動でも攻撃タイプは途中で切り替えません。Undoでは攻撃を逆再生せず、位置を戻したあと論理位置から塗装範囲を再計算します。

## 採用形式

- 本番入力: 透明RGBAのPNGスプライトストリップ
- 確認用: アニメーションWebP
- 色: PNGの不透明部分をマスクとして使い、実行時に選択色へ着色
- 基準方向: 右向き
- 上下左右: キャラクター本体は回転せず、攻撃・移動尾・跳弾だけをルートの接線方向へ回転
- 折り返し: 長いエフェクト画像自体を曲げず、ルート座標と `ricochet` 素材を組み合わせる

色付きWebPは動きの確認用で、ランタイムでは使用しません。選択色や白色へ正確に追従できるよう、本番ではアルファマスクPNGを使用します。

## スプライト規格

原則として全ファイルを次の規格へ統一しています。

- 画像サイズ: 2172 × 724 px
- フレーム数: 3
- 1フレーム: 724 × 724 px
- 配置: 左から `予備動作 / 最大形 / 収束または反動`
- 背景: 透明
- 色: 白〜薄いグレー
- 基本の素材再生情報は `manifest.json` に保持

`landing-splash-mask-strip-v1.png` は6段階の初期試作です。本番では3フレームへ整理した `landing-splash-mask-strip-v2.png` を使用します。

## 素材一覧

| ファイル | 用途 | 現行実装での扱い |
|---|---|---|
| `shot-mask-strip-v1.png` | SHOT | ルート上を進む粒弾 |
| `beam-cap-mask-strip-v1.png` | BEAM | 細いビーム系攻撃の先端 |
| `wave-mask-strip-v1.png` | WAVE | 扇状の波形攻撃 |
| `bomb-mask-strip-v1.png` | BOMB | 色玉と着弾表現 |
| `burst-mask-strip-v1.png` | BURST | 太いインク帯系の攻撃 |
| `ricochet-mask-strip-v1.png` | 折り返し | Uターン地点の接触・跳弾表現 |
| `move-tail-mask-strip-v1.png` | 移動 | キャラクター本体の背後へ表示 |
| `landing-splash-mask-strip-v2.png` | 着地 | 移動先での着地飛沫 |

`previews/` 内のWebPは確認用です。

ファイル名、素材パス、プレビュー、フレーム情報、攻撃割り当ては `manifest.json` にまとめています。

## 攻撃タイプの割り当て

`data/raw-manifest.json` の武器カテゴリと `assets/effects/manifest.json` の `attackMapping` を使用します。

| 現在マス | 既存カテゴリ | 攻撃タイプ |
|---|---|---|
| START | `start` | SHOT |
| メイン | `shooter` / `maneuver` / `blaster` | SHOT |
| メイン | `charger` / `spinner` / `stringer` | BEAM |
| メイン | `roller` / `brush` / `wiper` | WAVE |
| メイン | `slosher` | BOMB |
| メイン | `shelter` | BURST |
| サブ | `sub` | BOMB |
| スペシャル | `special` | BURST |
| GOAL | `goal` | 攻撃なし |

移動開始時に判定した攻撃タイプを、その移動が完了するまで維持します。

## キャラクター素材

`assets/player/` にはスライム、イカ型、タコ型の待機・移動素材があります。

- キャラクター本体は全方向で正面向きを維持
- body-maskを選択色へ着色
- light/dark-detailsを重ねてディテールを保持
- 移動尾・攻撃・跳弾だけが進行方向へ追従
- 設定からキャラクター種を切り替え可能

## 現行タイミング

`app.js` の基本値は次のとおりです。

| 状態 | 基本時間 |
|---|---:|
| WINDUP | 110 ms |
| ATTACK | 230 ms / 区間 |
| PAINT | 50 ms / 区間 |
| MOVE | 240 ms / 区間 |
| LANDING | 180 ms / 区間 |

設定の「移動速度」は、上記の基本時間へ次の倍率を掛けます。

| 設定 | 倍率 |
|---|---:|
| ゆっくり | 1.25 |
| 標準 | 1.00 |
| はやい | 0.68 |

## ルートとの連携

Issue #7で作成した盤面ルートを `buildBoardRouteModel()` で再利用可能なモデルへ変換し、静的な道、攻撃エフェクト、キャラクター移動で同じ座標を使用します。

U字カーブを含む各区間は近似距離テーブルを持ち、`getSegmentPointAtProgress()` でルート上の位置と接線を求めます。これにより、直線・縦移動・横移動・Uターンを同じ処理で扱います。

## 状態とフォールバック

- `paintedUntilPosition` を論理的な塗装位置として保持
- Undo時は現在位置へ合わせて塗装範囲も巻き戻す
- 表示変更・リサイズでは塗装済みピクセルを保存せず、論理位置から再描画
- `manifest.json` の読み込みに失敗した場合もゲーム進行は継続
- エフェクト素材が利用できない場合は演出を省略して進行
- アニメーション中は進行・Undo・設定変更などをロック
- `prefers-reduced-motion: reduce` では攻撃・移動の軌跡アニメーションを省略し、状態更新を短時間で完了

## 関連ファイル

- `assets/effects/manifest.json`: 本番素材・割り当て定義
- `assets/effects/GENERATION_PROMPTS.md`: 素材生成時のプロンプト記録
- `assets/effects/INTEGRATION_PLAN.md`: Issue #8の実装記録・保守向け構成
- `assets/concepts/`: コンセプト画像
- `assets/player/`: キャラクター素材
- `assets/packages/`: 素材パッケージ
