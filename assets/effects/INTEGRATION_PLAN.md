# Issue #8 実装記録・アーキテクチャ

このファイルは、Issue #8「キャラクターがマスのタイプに応じて道を攻撃・塗装して移動する演出」の実装記録です。

当初の実装計画は PR #10 で完了したため、現在は保守・拡張時に参照する構成資料として残します。

## 完了状況

- Issue #7の盤面ルート基盤を再利用
- スライム / イカ型 / タコ型の待機・移動表示を追加
- マス種別に応じた5種類の攻撃を追加
- 攻撃 → 塗装 → 移動 → 着地の状態遷移を追加
- Uターン地点の跳弾表現を追加
- Undo・GOAL・色変更・表示変更へ追従
- 移動速度設定と reduced motion 対応を追加

## 1. ルートモデル

Issue #7でSVG描画用に生成していたルートを、攻撃とキャラクター移動でも共有できるモデルへ分離しました。

主要な関数は次のとおりです。

```text
buildBoardRouteModel()
  -> width / height / cellSize
  -> centers[]
  -> segments[]
       index / from / to / folded / SVG path / length / distanceTable

getSegmentPointAndTangent(segment, t)
  -> point / tangent

getSegmentPointAtProgress(segment, progress)
  -> 距離補正した point / tangent

renderBoardRoute()
  -> 静的な道・矢印・通過済み表示
```

U字カーブを含む区間は24サンプルの近似距離表を作り、曲線でも進行率に対して極端な速度差が出ないようにしています。

## 2. 論理状態

ゲーム進行と演出状態は、ピクセル位置ではなく論理状態を基準にします。

主な状態は次のとおりです。

```text
position
paintedUntilPosition
animationPhase
isAnimating
```

塗装済み画像そのものは保存せず、現在位置と `paintedUntilPosition` からルートを再描画します。

## 3. 状態機械

移動区間ごとに次の順序で進行します。

```text
IDLE
  -> WINDUP
  -> ATTACK
  -> PAINT
  -> MOVE
  -> LANDING
  -> IDLE
```

- `WINDUP`: キャラクター本体の攻撃前動作
- `ATTACK`: 現在マスから決定したエフェクトをルート上へ流す
- `PAINT`: 対象区間を選択色へ更新
- `MOVE`: キャラクター本体を同じルート上へ移動
- `LANDING`: 移動先で着地飛沫を表示

複数マス移動時も、攻撃タイプは移動開始時に1回だけ決定します。

## 4. 攻撃タイプ

`assets/effects/manifest.json` の `attackMapping` と `data/raw-manifest.json` の武器カテゴリを使用します。

```text
SHOT  : shooter / maneuver / blaster / START
BEAM  : charger / spinner / stringer
WAVE  : roller / brush / wiper
BOMB  : slosher / sub
BURST : shelter / special
GOAL  : 攻撃なし
```

公式作品の武器形状・固有弾道を再現せず、既存カテゴリを入力として独自の抽象エフェクトへ割り当てます。

## 5. 素材読み込み

- エフェクト定義は `assets/effects/manifest.json` から読み込む
- PNGスプライトをアルファマスクとして利用し、選択色へ着色
- WebPはプレビュー専用
- マニフェスト読み込み失敗時は警告を出し、演出なしでもゲーム進行を継続
- キャラクター素材は `assets/player/` を使用

## 6. キャラクター

設定から次の3種類を選択できます。

- スライム
- イカ型
- タコ型

全方向でキャラクター本体は正面向きを維持します。進行方向は攻撃、移動尾、跳弾などの別レイヤーで表現します。

キャラクター本体は body-mask を選択色へ着色し、light/dark-details を上へ重ねます。

## 7. タイミングと速度設定

基本時間は次のとおりです。

```text
WINDUP  110 ms
ATTACK  230 ms / 区間
PAINT    50 ms / 区間
MOVE    240 ms / 区間
LANDING 180 ms / 区間
```

速度設定の倍率:

```text
slow   1.25
normal 1.00
fast   0.68
```

`prefers-reduced-motion: reduce` の場合、軌跡アニメーションを省略して論理状態を即時に近い形で更新します。

## 8. Undo・リセット・再生成

- Undoでは攻撃を逆再生しない
- 位置を戻すアニメーション後、`paintedUntilPosition` を現在位置へ合わせる
- 「最初から」「盤面を再生成」では位置、塗装位置、アニメーション状態を初期化
- 表示レイアウト変更ではゲーム進行状態を維持

## 9. 操作ロック

アニメーション実行中は、途中状態が壊れないよう進行操作、Undo、再生成、色・表示設定、キャラクター・速度設定などを無効化します。

## 10. 検証記録

PR #10 では次を確認しました。

- 直線移動
- 縦移動
- Uターン・折り返し
- 複数マス移動
- GOAL到着
- 1手戻す
- 390px / 768px / 1440pxで横方向の画面はみ出しなし
- JavaScript構文
- 差分・JSON・素材参照・配布ZIPの整合性
- ブラウザの警告・エラーなし
- reduced motion のCSS・JavaScript経路

OS側の reduced motion 設定を実際に切り替えた目視確認は、PR #10時点では未実施です。

## 11. 今後変更する場合

演出を拡張するときは、盤面ルートとキャラクター移動で別々の座標計算を作らず、`buildBoardRouteModel()` の同一ルートモデルを共有してください。

攻撃素材や割り当てを追加する場合は、まず `assets/effects/manifest.json` を更新し、コード側へ同じ定義を重複して持たせない方針を維持します。
