# Issue #8 実装開始時の手順

Issue #7のマージ後、最新の `main` を基点にIssue #8専用ブランチ／worktreeを作成する。Issue #7のworktreeや古い `dev` は基点にしない。

## 0. 素材を保全する

現在の `assets/concepts/`、`assets/player/`、`assets/effects/`、`assets/packages/` は未追跡である。Issue #8用worktreeを作成したあと、同worktreeへコピーし、最初に素材だけの独立コミットとして保存する。

## 1. Issue #7のルートを再利用可能にする

Issue #7では、SVG描画に必要な `segments` が `renderBoardRoute()` のローカル変数になっている。Issue #8の攻撃とキャラクター移動から同じ座標を使用できるよう、最初にルートモデルの生成と描画を分離する。

想定する境界は次のとおり。

```text
buildBoardRouteModel()
  -> width / height / cellSize
  -> centers[]
  -> segments[]
       index / from / to / folded / SVG path / control points

getSegmentPointAndTangent(segment, progress)
  -> point / tangent

renderBoardRoute(routeModel, paintedPosition)
  -> 静的な道・矢印・通過済み表示
```

曲線上を一定速度で動かすため、U字カーブは制御点だけでなく近似長も保持する。初期版は各ベジェ曲線を16〜24分割して距離表を作れば十分。

## 2. 論理状態と表示状態を分ける

保存・Undoの対象はピクセルや途中フレームではなく、次の論理状態とする。

```text
position
moveStartPosition
moveTargetPosition
attackType
paintedUntilPosition
animationPhase
```

通常保存するのは既存ゲーム状態と `position`。途中アニメーションはページ再読込後に復元せず、論理位置と塗装位置が一致する安定状態へ戻す。

## 3. 状態機械を追加する

```text
IDLE
  -> WINDUP
  -> ATTACK
  -> PAINT
  -> MOVE
  -> LANDING
  -> IDLE
```

- `WINDUP`: 正面向き本体の変形だけを行う
- `ATTACK`: マニフェストから選んだエフェクトをルート上へ流す
- `PAINT`: 攻撃先端までの区間を選択色へ更新する
- `MOVE`: 本体を同じルート上へ移動し、背後へ移動尾を表示する
- `LANDING`: 最終マスで着地飛沫を再生する

アニメーション中は、サイコロ・手入力・Undo・リセット・再生成・色・表示設定をロックする。

## 4. 素材の読み込み

- `assets/effects/manifest.json` を読み込む
- 読み込み失敗時はエフェクトなしでもゲーム進行を継続する
- PNG読み込み完了前の操作では、単純な円・線のフォールバックを使用するか、初回操作だけ短時間待機する
- アニメーションWebPはランタイムで使わない
- 色は選択色、白色時の境界はIssue #7のグラファイト色を利用する

## 5. 実装順

1. 素材のみを保存
2. ルートモデルの抽出。見た目を変えず既存#7確認を再実行
3. 正面向きキャラクターの待機表示
4. MOVEと移動尾
5. LANDING
6. SHOT
7. BEAM / WAVE / BOMB / BURST
8. UターンのRICOCHET
9. 色変更、Undo、GOAL、reduced motion
10. 全受入確認

## 6. 最低テスト行列

| 分類 | 条件 |
|---|---|
| キャラクター | スライム / イカ型 / タコ型 |
| 方向 | → / ← / ↑ / ↓ |
| ルート | 直線 / 横方向Uターン / 縦方向Uターン |
| 出目 | 0 / 1 / 6 / GOALを越える値 |
| 攻撃 | SHOT / BEAM / WAVE / BOMB / BURST |
| 色 | 代表色2色以上 / 白 |
| 表示 | 横1行 / 縦1列 / 5列 / 10列 / カスタム |
| 倍率 | 0.5 / 1.0 / 3.0 |
| 状態 | Undo / リセット / 再生成 / 見渡しから移動 |
| 環境 | 通常 / 狭幅 / 1440×200 / reduced motion |

特に「攻撃が完了する前にキャラクターが動かない」「折り返しでも本体の顔が回転しない」「Undo後の塗装範囲と位置が一致する」を独立して確認する。
