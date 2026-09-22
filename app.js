const GOAL = 100;
const STORAGE_KEY = "splatoon3_sugoroku_prefs";
const RAW_MANIFEST_PATH = "data/raw-manifest.json";
const SUB_IMAGE_MAP_PATH = "data/sub-image-map.json";
const SPECIAL_IMAGE_MAP_PATH = "data/special-image-map.json";
const MOVE_STEP_MS = 160;
const UNDO_STEP_MS = 60;
const TOKEN_EDGE_OFFSET = 2;
const CELL_BASE_SIZE = 96;
const CELL_SCALE_MIN = 0.5;
const CELL_SCALE_MAX = 3;
const CELL_SCALE_DEFAULT = 1;
const PREFS_VERSION = 2;
const OVERVIEW_WRAP_COUNT = 15;
const OVERVIEW_CELL_MAX = 72;
const OVERVIEW_GAP = 4;
const ROUTE_GAP_RATIO = 0.2;
const ROUTE_WIDTH_RATIO = 0.24;
const ROUTE_OUTER_MARGIN_RATIO = 0.55;
const ROUTE_EDGE_PADDING_RATIO = 0.08;
const ROUTE_OUTLINE_HALF_RATIO = ROUTE_WIDTH_RATIO * 1.34 / 2;
const SVG_NS = "http://www.w3.org/2000/svg";

const DISPLAY_PRESETS = {
  row: {
    screenLayout: "horizontal",
    panelPosition: "left",
    direction: "right",
    wrapCount: 0,
    wrapDirection: "up",
    cellScale: 1.5
  },
  column: {
    screenLayout: "vertical",
    panelPosition: "top",
    direction: "up",
    wrapCount: 0,
    wrapDirection: "right",
    cellScale: 1.5
  },
  5: {
    screenLayout: "vertical",
    panelPosition: "top",
    direction: "right",
    wrapCount: 5,
    wrapDirection: "up",
    cellScale: 1
  },
  10: {
    screenLayout: "horizontal",
    panelPosition: "left",
    direction: "right",
    wrapCount: 10,
    wrapDirection: "up",
    cellScale: 1
  }
};

const MAIN_WEAPONS = [
  "ボールドマーカー",
  "ボールドマーカーネオ",
  "わかばシューター",
  "もみじシューター",
  "シャープマーカー",
  "シャープマーカーネオ",
  "シャープマーカーGECK",
  "プロモデラーMG",
  "プロモデラーRG",
  "プロモデラー彩(サイ)",
  "スプラシューター",
  "スプラシューターコラボ",
  "スプラシューター煌(コウ)",
  ".52ガロン",
  ".52ガロンデコ",
  "N-ZAP85",
  "N-ZAP89",
  "プライムシューター",
  "プライムシューターコラボ",
  "プライムシューターFRZN",
  ".96ガロン",
  ".96ガロンデコ",
  ".96ガロン爪(ソウ)",
  "ジェットスイーパー",
  "ジェットスイーパーカスタム",
  "ジェットスイーパーCOBR",
  "L3リールガン",
  "L3リールガンD",
  "L3リールガン箔(ハク)",
  "H3リールガン",
  "H3リールガンD",
  "H3リールガンSNAK",
  "ボトルガイザー",
  "ボトルガイザーフォイル",
  "スペースシューター",
  "スペースシューターコラボ",
  "スパッタリー",
  "スパッタリー・ヒュー",
  "スパッタリーOWL",
  "スプラマニューバー",
  "スプラマニューバーコラボ",
  "スプラマニューバー耀(ヨウ)",
  "ケルビン525",
  "ケルビン525デコ",
  "デュアルスイーパー",
  "デュアルスイーパーカスタム",
  "デュアルスイーパー蹄(テイ)",
  "クアッドホッパーブラック",
  "クアッドホッパーホワイト",
  "ガエンFF",
  "ガエンFFカスタム",
  "ノヴァブラスター",
  "ノヴァブラスターネオ",
  "ホットブラスター",
  "ホットブラスターカスタム",
  "ホットブラスター艶(エン)",
  "ロングブラスター",
  "ロングブラスターカスタム",
  "クラッシュブラスター",
  "クラッシュブラスターネオ",
  "ラピッドブラスター",
  "ラピッドブラスターデコ",
  "Rブラスターエリート",
  "Rブラスターエリートデコ",
  "RブラスターエリートWNTR",
  "S-BLAST92",
  "S-BLAST91",
  "パブロ",
  "パブロ・ヒュー",
  "ホクサイ",
  "ホクサイ・ヒュー",
  "ホクサイ彗(スイ)",
  "フィンセント",
  "フィンセント・ヒュー",
  "フィンセントBRNZ",
  "カーボンローラー",
  "カーボンローラーデコ",
  "カーボンローラーANGL",
  "スプラローラー",
  "スプラローラーコラボ",
  "ダイナモローラー",
  "ダイナモローラーテスラ",
  "ダイナモローラー冥(メイ)",
  "ヴァリアブルローラー",
  "ヴァリアブルローラーフォイル",
  "ワイドローラー",
  "ワイドローラーコラボ",
  "ワイドローラー惑(ワク)",
  "バケットスロッシャー",
  "バケットスロッシャーデコ",
  "ヒッセン",
  "ヒッセン・ヒュー",
  "ヒッセンASH",
  "スクリュースロッシャー",
  "スクリュースロッシャーネオ",
  "オーバーフロッシャー",
  "オーバーフロッシャーデコ",
  "エクスプロッシャー",
  "エクスプロッシャーカスタム",
  "モップリン",
  "モップリンD",
  "モップリン角(カク)",
  "パラシェルター",
  "パラシェルターソレーラ",
  "キャンピングシェルター",
  "キャンピングシェルターソレーラ",
  "キャンピングシェルターCREM",
  "スパイガジェット",
  "スパイガジェットソレーラ",
  "スパイガジェット繚(リョウ)",
  "24式張替傘・甲",
  "24式張替傘・乙",
  "スプラスピナー",
  "スプラスピナーコラボ",
  "スプラスピナーPYTN",
  "バレルスピナー",
  "バレルスピナーデコ",
  "ハイドラント",
  "ハイドラントカスタム",
  "ハイドラント圧(アツ)",
  "クーゲルシュライバー",
  "クーゲルシュライバー・ヒュー",
  "ノーチラス47",
  "ノーチラス79",
  "イグザミナー",
  "イグザミナー・ヒュー",
  "スクイックリンα",
  "スクイックリンβ",
  "スプラチャージャー",
  "スプラチャージャーコラボ",
  "スプラチャージャーFRST",
  "スプラスコープ",
  "スプラスコープコラボ",
  "スプラスコープFRST",
  "リッター4K",
  "4Kスコープ",
  "リッター4Kカスタム",
  "4Kスコープカスタム",
  "14式竹筒銃・甲",
  "14式竹筒銃・乙",
  "ソイチューバー",
  "ソイチューバーカスタム",
  "R-PEN/5H",
  "R-PEN/5B",
  "トライストリンガー",
  "トライストリンガーコラボ",
  "トライストリンガー燈(トウ)",
  "LACT-450",
  "LACT-450デコ",
  "LACT-450MILK",
  "フルイドV",
  "フルイドVカスタム",
  "ジムワイパー",
  "ジムワイパー・ヒュー",
  "ジムワイパー封(フウ)",
  "ドライブワイパー",
  "ドライブワイパーデコ",
  "ドライブワイパーRUST",
  "デンタルワイパーミント",
  "デンタルワイパースミ"
];

const SUB_WEAPONS = [
  "カーリングボム",
  "ジャンプビーコン",
  "ポイントセンサー",
  "トーピード",
  "タンサンボム",
  "ポイズンミスト",
  "スプラッシュボム",
  "キューバンボム",
  "スプリンクラー",
  "スプラッシュシールド",
  "ロボットボム",
  "ラインマーカー",
  "トラップ",
  "クイックボム"
];

const SPECIAL_WEAPONS = [
  "ウルトラハンコ",
  "メガホンレーザー5.1ch",
  "グレートバリア",
  "ホップソナー",
  "カニタンク",
  "トリプルトルネード",
  "アメフラシ",
  "サメライド",
  "ナイスダマ",
  "スミナガシート",
  "ウルトラショット",
  "テイオウイカ",
  "エナジースタンド",
  "デコイチラシ",
  "マルチミサイル",
  "キューインキ",
  "ウルトラチャクチ",
  "ショクワンダー",
  "ジェットパック"
];

const gameState = {
  position: 0,
  inputMode: "dice",
  isAnimating: false,
  cells: [],
  history: []
};

const viewState = {
  preset: "10",
  ...DISPLAY_PRESETS["10"],
  viewZoom: 1,
  overviewMode: false,
  followCurrent: true,
  squidColor: "#22d3ee",
  debugInfo: false
};

const board = document.getElementById("board");
const boardWrap = document.getElementById("boardWrap");
const boardViewport = document.getElementById("boardViewport");
const displayPresets = [...document.querySelectorAll('input[name="displayPreset"]')];
const screenLayouts = [...document.querySelectorAll('input[name="screenLayout"]')];
const panelPositions = [...document.querySelectorAll('input[name="panelPosition"]')];
const travelDirections = [...document.querySelectorAll('input[name="travelDirection"]')];
const wrapDirections = [...document.querySelectorAll('input[name="wrapDirection"]')];
const wrapEnabledInput = document.getElementById("wrapEnabled");
const wrapCountInput = document.getElementById("wrapCount");
const panelPositionOptions = document.getElementById("panelPositionOptions");
const wrapDirectionOptions = document.getElementById("wrapDirectionOptions");
const followCurrent = document.getElementById("followCurrent");
const squidColorInput = document.getElementById("squidColor");
const inputModes = [...document.querySelectorAll('input[name="inputMode"]')];
const colorPresets = [...document.querySelectorAll('input[name="squidColorPreset"]')];
const debugInfoInput = document.getElementById("debugInfo");
const debugInfoLine = document.getElementById("debugInfoLine");
const settingsDialog = document.getElementById("settingsDialog");
const settingsBtn = document.getElementById("settingsBtn");
const closeSettingsBtn = document.getElementById("closeSettingsBtn");
const customDisplayDetails = document.getElementById("customDisplayDetails");
const undoBtn = document.getElementById("undoBtn");
const moreActions = document.getElementById("moreActions");
const diceBox = document.getElementById("diceBox");
const manualBox = document.getElementById("manualBox");
const manualStepInput = document.getElementById("manualStepInput");
const manualMoveBtn = document.getElementById("manualMoveBtn");
const rollBtn = document.getElementById("rollBtn");
const diceResult = document.getElementById("diceResult");
const returnCurrentBtn = document.getElementById("returnCurrentBtn");
const resetBtn = document.getElementById("resetBtn");
const regenBtn = document.getElementById("regenBtn");
const cellScaleInput = document.getElementById("cellScale");
const cellScaleValue = document.getElementById("cellScaleValue");
const positionText = document.getElementById("positionText");
const cellType = document.getElementById("cellType");
const weaponText = document.getElementById("weaponText");
const goalDialog = document.getElementById("goalDialog");
const goalUndoBtn = document.getElementById("goalUndoBtn");
const goalResetBtn = document.getElementById("goalResetBtn");
const goalRegenBtn = document.getElementById("goalRegenBtn");
const goalCloseBtn = document.getElementById("goalCloseBtn");
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
let playerToken = null;

const imageMaps = {
  weaponByName: new Map(),
  subByName: {},
  specialByName: {}
};

function toWeaponImagePath(item) {
  return `assets/weapons/${String(item.globalOrder).padStart(3, "0")}-${item.category}-${String(item.categoryOrder).padStart(2, "0")}.png`;
}

async function fetchJson(path) {
  const response = await fetch(path, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`${path}: ${response.status}`);
  }
  return response.json();
}

async function loadImageMaps() {
  try {
    const [manifest, subMap, specialMap] = await Promise.all([
      fetchJson(RAW_MANIFEST_PATH),
      fetchJson(SUB_IMAGE_MAP_PATH),
      fetchJson(SPECIAL_IMAGE_MAP_PATH)
    ]);

    imageMaps.weaponByName = new Map(
      manifest.items.map((item) => [item.weaponNameJa, toWeaponImagePath(item)])
    );
    imageMaps.subByName = subMap;
    imageMaps.specialByName = specialMap;
    renderBoard({ smoothFollow: false });
  } catch (error) {
    console.warn("画像対応表の読み込みに失敗しました。", error);
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function getCellImageSrc(data) {
  if (data.kind === "main") {
    return imageMaps.weaponByName.get(data.weapon) ?? "";
  }
  if (data.kind === "sub") {
    return imageMaps.subByName[data.weapon] ?? "";
  }
  if (data.kind === "special") {
    return imageMaps.specialByName[data.weapon] ?? "";
  }
  return "";
}

function loadPrefs() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function savePrefs() {
  try {
    const prefs = {
      version: PREFS_VERSION,
      preset: viewState.preset,
      screenLayout: viewState.screenLayout,
      panelPosition: viewState.panelPosition,
      direction: viewState.direction,
      wrapCount: viewState.wrapCount,
      wrapDirection: viewState.wrapDirection,
      cellScale: viewState.cellScale,
      squidColor: viewState.squidColor,
      followCurrent: viewState.followCurrent,
      debugInfo: viewState.debugInfo
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // Ignore storage errors (private mode / quota).
  }
}

function chooseInitialPreset() {
  const width = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const height = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
  const aspectRatio = width / Math.max(1, height);

  // A very wide, shallow viewport is typically a stream overlay.
  if (height <= 360 && aspectRatio >= 2.6) {
    return "row";
  }
  if (width <= 640) {
    return "column";
  }
  return "10";
}

function applyPrefs() {
  const prefs = loadPrefs() ?? {};
  const validPresets = [...Object.keys(DISPLAY_PRESETS), "custom"];

  if (prefs.version === PREFS_VERSION) {
    const preset = validPresets.includes(prefs.preset) ? prefs.preset : "custom";
    const fallbackPreset = preset === "custom" ? DISPLAY_PRESETS["10"] : DISPLAY_PRESETS[preset];
    Object.assign(viewState, fallbackPreset, {
      preset,
      screenLayout: ["horizontal", "vertical"].includes(prefs.screenLayout)
        ? prefs.screenLayout
        : fallbackPreset.screenLayout,
      panelPosition: ["left", "right", "top", "bottom"].includes(prefs.panelPosition)
        ? prefs.panelPosition
        : fallbackPreset.panelPosition,
      direction: ["right", "left", "up", "down"].includes(prefs.direction)
        ? prefs.direction
        : fallbackPreset.direction,
      wrapCount: clampWrapCount(prefs.wrapCount, true),
      wrapDirection: ["up", "down", "left", "right"].includes(prefs.wrapDirection)
        ? prefs.wrapDirection
        : fallbackPreset.wrapDirection,
      cellScale: clampCellScale(prefs.cellScale)
    });
    normalizeViewState();
  } else {
    migrateLegacyPrefs(prefs);
  }

  if (typeof prefs.squidColor === "string" && /^#[0-9a-fA-F]{6}$/.test(prefs.squidColor)) {
    viewState.squidColor = prefs.squidColor;
  }
  if (typeof prefs.followCurrent === "boolean") {
    viewState.followCurrent = prefs.followCurrent;
  }
  viewState.debugInfo = prefs.debugInfo === true;
  syncPresetSelection();
}

function applyTheme() {
  document.documentElement.style.setProperty("--squid-color", viewState.squidColor);
  const rgb = viewState.squidColor
    .slice(1)
    .match(/.{2}/g)
    ?.map((value) => Number.parseInt(value, 16)) ?? [0, 0, 0];
  const luminance = (rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722) / 255;
  document.documentElement.style.setProperty(
    "--squid-contrast",
    luminance > 0.72 ? "#303844" : "#ffffff"
  );
  colorPresets.forEach((radio) => {
    radio.checked = radio.value.toLowerCase() === viewState.squidColor.toLowerCase();
  });
}

function clampCellScale(value) {
  const numeric = Number(value);
  const safeValue = Number.isFinite(numeric) ? numeric : CELL_SCALE_DEFAULT;
  return Math.min(CELL_SCALE_MAX, Math.max(CELL_SCALE_MIN, safeValue));
}

function clampWrapCount(value, allowZero = false) {
  const numeric = Math.round(Number(value));
  if (!Number.isFinite(numeric)) {
    return allowZero ? 0 : 10;
  }
  if (allowZero && numeric <= 0) {
    return 0;
  }
  return Math.min(GOAL, Math.max(1, numeric));
}

function formatCellScale(value) {
  return `${value.toFixed(1)}倍`;
}

function migrateLegacyPrefs(prefs) {
  const legacyMode = ["row", "1", "5", "10", "15", "20"].includes(prefs.displayMode)
    ? prefs.displayMode
    : chooseInitialPreset();
  const preset = legacyMode === "1" ? "column" : legacyMode;

  if (DISPLAY_PRESETS[preset]) {
    Object.assign(viewState, DISPLAY_PRESETS[preset], { preset });
  } else {
    Object.assign(viewState, DISPLAY_PRESETS["10"], {
      preset: "custom",
      wrapCount: Number(legacyMode)
    });
  }

  const legacyScale = legacyMode === "row" ? prefs.singleRowScale : prefs.singleColScale;
  if (Number.isFinite(Number(legacyScale)) && (legacyMode === "row" || legacyMode === "1")) {
    viewState.cellScale = clampCellScale(legacyScale);
  }
  syncPresetSelection();
}

function normalizeViewState() {
  if (viewState.screenLayout === "horizontal" && !["left", "right"].includes(viewState.panelPosition)) {
    viewState.panelPosition = "left";
  }
  if (viewState.screenLayout === "vertical" && !["top", "bottom"].includes(viewState.panelPosition)) {
    viewState.panelPosition = "top";
  }

  const horizontalTravel = ["right", "left"].includes(viewState.direction);
  if (horizontalTravel && !["up", "down"].includes(viewState.wrapDirection)) {
    viewState.wrapDirection = "up";
  }
  if (!horizontalTravel && !["left", "right"].includes(viewState.wrapDirection)) {
    viewState.wrapDirection = "right";
  }
  viewState.wrapCount = clampWrapCount(viewState.wrapCount, true);
  viewState.cellScale = clampCellScale(viewState.cellScale);
}

function viewMatchesPreset(preset) {
  const values = DISPLAY_PRESETS[preset];
  return values
    && values.screenLayout === viewState.screenLayout
    && values.panelPosition === viewState.panelPosition
    && values.direction === viewState.direction
    && values.wrapCount === viewState.wrapCount
    && values.wrapDirection === viewState.wrapDirection;
}

function syncPresetSelection() {
  const matchingPreset = Object.keys(DISPLAY_PRESETS).find(viewMatchesPreset);
  viewState.preset = matchingPreset ?? "custom";
}

function applyCellScaleControl() {
  cellScaleInput.value = String(viewState.cellScale);
  cellScaleValue.textContent = formatCellScale(viewState.cellScale);
  cellScaleInput.disabled = gameState.isAnimating;
}

function applyCellSize() {
  applyBoardScale();
  positionPlayerToken(false);
  updateReturnCurrentButton();

  if (shouldFollowCurrent()) {
    scrollToCurrent(false);
  }
}

function isRowMode() {
  return ["right", "left"].includes(viewState.direction) && viewState.wrapCount === 0;
}

function applyViewClasses() {
  document.body.classList.toggle("row-mode", isRowMode());
  document.body.classList.toggle("view-layout-horizontal", viewState.screenLayout === "horizontal");
  document.body.classList.toggle("view-layout-vertical", viewState.screenLayout === "vertical");
  document.body.classList.toggle("panel-left", viewState.panelPosition === "left");
  document.body.classList.toggle("panel-right", viewState.panelPosition === "right");
  document.body.classList.toggle("panel-top", viewState.panelPosition === "top");
  document.body.classList.toggle("panel-bottom", viewState.panelPosition === "bottom");
}

function applyInputMode(value) {
  gameState.inputMode = value;
  inputModes.forEach((radio) => {
    radio.checked = radio.value === value;
  });
  diceBox.classList.toggle("hidden", value !== "dice");
  manualBox.classList.toggle("hidden", value !== "manual");
  rollBtn.classList.toggle("hidden", value !== "dice");
  manualMoveBtn.classList.toggle("hidden", value !== "manual");
}

function setControlsDisabled(disabled) {
  const controls = [
    ...displayPresets,
    ...screenLayouts,
    ...panelPositions,
    ...travelDirections,
    ...wrapDirections,
    wrapEnabledInput,
    wrapCountInput,
    followCurrent,
    squidColorInput,
    ...inputModes,
    ...colorPresets,
    manualStepInput,
    rollBtn,
    manualMoveBtn,
    undoBtn,
    settingsBtn,
    returnCurrentBtn,
    cellScaleInput,
    resetBtn,
    regenBtn
  ];
  controls.forEach((el) => {
    el.disabled = disabled;
  });
  undoBtn.disabled = disabled || gameState.history.length === 0;
  updateCustomControls();
}

function wait(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function createUniquePicker(list) {
  let pool = shuffle(list);
  let idx = 0;
  let lap = 1;

  return () => {
    if (pool.length === 0) {
      return "-";
    }

    const base = pool[idx];
    const value = lap === 1 ? base : `${base} (${lap})`;

    idx += 1;
    if (idx >= pool.length) {
      idx = 0;
      lap += 1;
      pool = shuffle(pool);
    }

    return value;
  };
}

function buildCells() {
  const cells = [];
  const pickMainUnique = createUniquePicker(MAIN_WEAPONS);
  const pickSubUnique = createUniquePicker(SUB_WEAPONS);
  const pickSpecialUnique = createUniquePicker(SPECIAL_WEAPONS);

  for (let i = 0; i <= GOAL; i += 1) {
    if (i === 0) {
      cells[i] = { index: i, kind: "start", weapon: "Start" };
      continue;
    }

    if (i === GOAL) {
      cells[i] = { index: i, kind: "goal", weapon: "Goal" };
      continue;
    }

    if (i % 5 === 0) {
      const kind = Math.random() < 0.5 ? "sub" : "special";
      const weapon = kind === "sub" ? pickSubUnique() : pickSpecialUnique();
      cells[i] = { index: i, kind, weapon };
      continue;
    }

    cells[i] = { index: i, kind: "main", weapon: pickMainUnique() };
  }

  gameState.cells = cells;
}

function shouldFollowCurrent() {
  return viewState.followCurrent;
}

function createBoardLayout(total, settings) {
  const count = total + 1;
  const horizontalTravel = ["right", "left"].includes(settings.direction);
  const lineLength = settings.wrapCount === 0
    ? count
    : Math.min(count, clampWrapCount(settings.wrapCount));
  const lineCount = Math.ceil(count / lineLength);
  const items = [];

  for (let index = 0; index <= total; index += 1) {
    const line = Math.floor(index / lineLength);
    const offset = index % lineLength;
    let row;
    let col;

    if (horizontalTravel) {
      const forward = (settings.direction === "right") !== (line % 2 === 1);
      col = forward ? offset : lineLength - 1 - offset;
      row = settings.wrapDirection === "up" ? lineCount - 1 - line : line;
    } else {
      const forward = (settings.direction === "down") !== (line % 2 === 1);
      row = forward ? offset : lineLength - 1 - offset;
      col = settings.wrapDirection === "left" ? lineCount - 1 - line : line;
    }

    items.push({ index, row: row + 1, col: col + 1 });
  }

  return {
    columns: horizontalTravel ? lineLength : lineCount,
    rows: horizontalTravel ? lineCount : lineLength,
    items
  };
}

function getBoardLayout(total = GOAL) {
  if (viewState.overviewMode) {
    return createBoardLayout(total, {
      direction: "right",
      wrapCount: OVERVIEW_WRAP_COUNT,
      wrapDirection: "up"
    });
  }
  return createBoardLayout(total, viewState);
}

function getDisplayCols() {
  return getBoardLayout().columns;
}

function isWideTwoPaneLayout() {
  return viewState.screenLayout === "horizontal";
}

function scrollToCurrent(smooth, options = {}) {
  smooth = smooth && !reducedMotionQuery.matches;
  const currentCell = board.querySelector(`[data-index="${gameState.position}"]`);
  if (!currentCell) {
    return;
  }

  const wrapRect = boardWrap.getBoundingClientRect();
  const cellRect = currentCell.getBoundingClientRect();
  const targetTop = boardWrap.scrollTop + cellRect.top - wrapRect.top
    + cellRect.height / 2 - boardWrap.clientHeight / 2;
  const targetLeft = boardWrap.scrollLeft + cellRect.left - wrapRect.left
    + cellRect.width / 2 - boardWrap.clientWidth / 2;

  boardWrap.scrollTo({
    top: Math.max(0, targetTop),
    left: Math.max(0, targetLeft),
    behavior: smooth ? "smooth" : "auto"
  });
}

function applyBoardScale() {
  board.style.transform = "scale(1)";
  boardViewport.style.minHeight = "";
  boardViewport.style.paddingBottom = "";
  const layout = getBoardLayout();
  const requestedCellSize = CELL_BASE_SIZE * viewState.cellScale;
  let cellSize = requestedCellSize;
  let gap;

  if (viewState.overviewMode) {
    cellSize = calculateOverviewCellSize(layout);
    gap = OVERVIEW_GAP;
    viewState.viewZoom = cellSize / requestedCellSize;
  } else {
    viewState.viewZoom = 1;
    if (isRowMode()) {
      const viewportStyle = window.getComputedStyle(boardViewport);
      const verticalPadding = parseFloat(viewportStyle.paddingTop)
        + parseFloat(viewportStyle.paddingBottom);
      const availableHeight = Math.max(1, boardWrap.clientHeight - verticalPadding - 2);
      const routePaddingFactor = 1 + ROUTE_EDGE_PADDING_RATIO * 2;
      cellSize = Math.min(requestedCellSize, availableHeight / routePaddingFactor);
    }
    gap = Math.max(4, cellSize * ROUTE_GAP_RATIO);
  }

  const horizontalTravel = viewState.overviewMode
    || ["right", "left"].includes(viewState.direction);
  const hasFold = horizontalTravel ? layout.rows > 1 : layout.columns > 1;
  const edgePadding = Math.max(2, cellSize * ROUTE_EDGE_PADDING_RATIO);
  const foldPadding = hasFold
    ? Math.max(
      edgePadding,
      cellSize * (ROUTE_OUTER_MARGIN_RATIO + ROUTE_OUTLINE_HALF_RATIO)
    )
    : edgePadding;
  const routePadding = horizontalTravel
    ? { top: edgePadding, right: foldPadding, bottom: edgePadding, left: foldPadding }
    : { top: foldPadding, right: edgePadding, bottom: foldPadding, left: edgePadding };

  document.body.classList.toggle("overview-mode", viewState.overviewMode);
  boardViewport.classList.toggle("overview-view", viewState.overviewMode);
  boardViewport.classList.toggle(
    "single-column-view",
    !viewState.overviewMode && layout.columns === 1
  );
  board.style.setProperty("--overview-cell-size", `${cellSize}px`);
  board.style.setProperty("--route-cell-size", `${cellSize}px`);
  board.style.setProperty("--route-width", `${Math.max(1, cellSize * ROUTE_WIDTH_RATIO)}px`);
  board.style.padding = `${routePadding.top}px ${routePadding.right}px ${routePadding.bottom}px ${routePadding.left}px`;
  board.style.gap = `${gap}px`;
  board.style.gridTemplateColumns = `repeat(${layout.columns}, ${cellSize}px)`;
  board.style.gridTemplateRows = `repeat(${layout.rows}, ${cellSize}px)`;

  const effectiveScale = cellSize / CELL_BASE_SIZE;
  const requestedScaleText = formatCellScale(viewState.cellScale);
  const effectiveScaleText = formatCellScale(effectiveScale);
  if (
    !viewState.overviewMode
    && isRowMode()
    && effectiveScale < viewState.cellScale - 0.01
    && effectiveScaleText !== requestedScaleText
  ) {
    cellScaleValue.textContent = `${requestedScaleText}（表示${effectiveScaleText}）`;
  } else {
    cellScaleValue.textContent = requestedScaleText;
  }

  renderBoardRoute({
    cellSize,
    horizontalTravel,
    outerMargin: cellSize * ROUTE_OUTER_MARGIN_RATIO
  });
}

function createSvgElement(name, attributes = {}) {
  const element = document.createElementNS(SVG_NS, name);
  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, String(value));
  });
  return element;
}

function createRouteSegment(start, end, previous, options) {
  const { cellSize, horizontalTravel, outerMargin } = options;
  const folded = horizontalTravel
    ? Math.abs(start.y - end.y) > 0.5
    : Math.abs(start.x - end.x) > 0.5;

  if (!folded) {
    return {
      d: `M ${start.x} ${start.y} L ${end.x} ${end.y}`,
      points: [start, end],
      folded: false
    };
  }

  if (horizontalTravel) {
    let direction = previous ? Math.sign(start.x - previous.x) : 0;
    if (direction === 0) {
      direction = viewState.direction === "left" ? -1 : 1;
    }
    const outsideX = start.x + direction * (cellSize / 2 + outerMargin);
    return {
      d: `M ${start.x} ${start.y} C ${outsideX} ${start.y}, ${outsideX} ${end.y}, ${end.x} ${end.y}`,
      points: [
        start,
        { x: outsideX, y: start.y },
        { x: outsideX, y: end.y },
        end
      ],
      folded: true
    };
  }

  let direction = previous ? Math.sign(start.y - previous.y) : 0;
  if (direction === 0) {
    direction = viewState.direction === "up" ? -1 : 1;
  }
  const outsideY = start.y + direction * (cellSize / 2 + outerMargin);
  return {
    d: `M ${start.x} ${start.y} C ${start.x} ${outsideY}, ${end.x} ${outsideY}, ${end.x} ${end.y}`,
    points: [
      start,
      { x: start.x, y: outsideY },
      { x: end.x, y: outsideY },
      end
    ],
    folded: true
  };
}

function getSegmentPointAndTangent(segment, t = 0.5) {
  if (segment.points.length === 2) {
    const [start, end] = segment.points;
    return {
      point: {
        x: start.x + (end.x - start.x) * t,
        y: start.y + (end.y - start.y) * t
      },
      tangent: { x: end.x - start.x, y: end.y - start.y }
    };
  }

  const [p0, p1, p2, p3] = segment.points;
  const inverse = 1 - t;
  const point = {
    x: inverse ** 3 * p0.x
      + 3 * inverse ** 2 * t * p1.x
      + 3 * inverse * t ** 2 * p2.x
      + t ** 3 * p3.x,
    y: inverse ** 3 * p0.y
      + 3 * inverse ** 2 * t * p1.y
      + 3 * inverse * t ** 2 * p2.y
      + t ** 3 * p3.y
  };
  const tangent = {
    x: 3 * inverse ** 2 * (p1.x - p0.x)
      + 6 * inverse * t * (p2.x - p1.x)
      + 3 * t ** 2 * (p3.x - p2.x),
    y: 3 * inverse ** 2 * (p1.y - p0.y)
      + 6 * inverse * t * (p2.y - p1.y)
      + 3 * t ** 2 * (p3.y - p2.y)
  };
  return { point, tangent };
}

function createInkSplatPath(cell, index) {
  const x = cell.offsetLeft;
  const y = cell.offsetTop;
  const width = cell.offsetWidth;
  const height = cell.offsetHeight;
  const spread = Math.max(2, Math.min(width, height) * 0.07);
  const jitter = (step) => {
    const wave = Math.sin((index + 1) * (step + 3) * 12.9898);
    return 0.78 + ((wave + 1) / 2) * 0.5;
  };
  const points = [
    [x + width * 0.12, y - spread * jitter(0)],
    [x + width * 0.5, y - spread * jitter(1)],
    [x + width * 0.88, y - spread * jitter(2)],
    [x + width + spread * jitter(3), y + height * 0.18],
    [x + width + spread * jitter(4), y + height * 0.58],
    [x + width + spread * jitter(5), y + height * 0.88],
    [x + width * 0.82, y + height + spread * jitter(6)],
    [x + width * 0.45, y + height + spread * jitter(7)],
    [x + width * 0.1, y + height + spread * jitter(8)],
    [x - spread * jitter(9), y + height * 0.82],
    [x - spread * jitter(10), y + height * 0.42],
    [x - spread * jitter(11), y + height * 0.12]
  ];
  return points.map(([px, py], idx) => `${idx === 0 ? "M" : "L"} ${px} ${py}`).join(" ") + " Z";
}

function createRouteArrow(segment, cellSize, className) {
  const { point, tangent } = getSegmentPointAndTangent(segment);
  const magnitude = Math.hypot(tangent.x, tangent.y) || 1;
  const ux = tangent.x / magnitude;
  const uy = tangent.y / magnitude;
  const px = -uy;
  const py = ux;
  const roadWidth = Math.max(1, cellSize * ROUTE_WIDTH_RATIO);
  const arrowLength = Math.max(5, roadWidth * 0.95);
  const arrowWidth = Math.max(4, roadWidth * 0.72);
  const tip = {
    x: point.x + ux * arrowLength * 0.55,
    y: point.y + uy * arrowLength * 0.55
  };
  const base = {
    x: point.x - ux * arrowLength * 0.45,
    y: point.y - uy * arrowLength * 0.45
  };
  const arrowPoints = [
    `${tip.x},${tip.y}`,
    `${base.x + px * arrowWidth / 2},${base.y + py * arrowWidth / 2}`,
    `${base.x - px * arrowWidth / 2},${base.y - py * arrowWidth / 2}`
  ].join(" ");
  return createSvgElement("polygon", {
    class: className,
    points: arrowPoints
  });
}

function renderBoardRoute(options = {}) {
  board.querySelector(":scope > .board-route")?.remove();
  const cells = [...board.querySelectorAll(":scope > .cell")]
    .sort((a, b) => Number(a.dataset.index) - Number(b.dataset.index));
  if (cells.length < 2) {
    return;
  }

  const width = board.clientWidth;
  const height = board.clientHeight;
  if (width <= 0 || height <= 0) {
    return;
  }

  const cellSize = options.cellSize ?? cells[0].offsetWidth;
  const horizontalTravel = options.horizontalTravel
    ?? (viewState.overviewMode || ["right", "left"].includes(viewState.direction));
  const outerMargin = options.outerMargin ?? cellSize * ROUTE_OUTER_MARGIN_RATIO;
  const centers = cells.map((cell) => ({
    x: cell.offsetLeft + cell.offsetWidth / 2,
    y: cell.offsetTop + cell.offsetHeight / 2
  }));
  const segments = [];
  for (let index = 0; index < centers.length - 1; index += 1) {
    segments.push(createRouteSegment(
      centers[index],
      centers[index + 1],
      centers[index - 1],
      { cellSize, horizontalTravel, outerMargin }
    ));
  }

  const svg = createSvgElement("svg", {
    class: "board-route",
    viewBox: `0 0 ${width} ${height}`,
    width,
    height,
    "aria-hidden": "true"
  });
  const fullRoute = segments.map((segment) => segment.d).join(" ");
  [
    ["route-outline", fullRoute],
    ["route-base", fullRoute],
    ["route-groove", fullRoute]
  ].forEach(([className, d]) => {
    svg.appendChild(createSvgElement("path", { class: className, d }));
  });

  if (gameState.position > 0) {
    const paintedRoute = segments
      .slice(0, gameState.position)
      .map((segment) => segment.d)
      .join(" ");
    svg.appendChild(createSvgElement("path", {
      class: "route-painted",
      d: paintedRoute
    }));
  }

  const visitedGroup = createSvgElement("g", { class: "route-visited-cells" });
  cells.slice(0, gameState.position).forEach((cell, index) => {
    visitedGroup.appendChild(createSvgElement("path", {
      class: "route-ink-splat",
      d: createInkSplatPath(cell, index)
    }));
  });
  svg.appendChild(visitedGroup);

  const nextSegment = segments[gameState.position];
  segments.forEach((segment, index) => {
    if (segment.folded && index !== gameState.position) {
      svg.appendChild(createRouteArrow(segment, cellSize, "route-turn-arrow"));
    }
  });
  if (nextSegment) {
    svg.appendChild(createRouteArrow(nextSegment, cellSize, "route-next-arrow"));
  }

  board.insertBefore(svg, board.firstChild);
}

function updateProgressCells() {
  board.querySelectorAll(":scope > .cell").forEach((cell) => {
    const index = Number(cell.dataset.index);
    cell.classList.toggle("visited", index < gameState.position);
    cell.classList.toggle("current", index === gameState.position);
  });
}

function getCurrentCellElement(position = gameState.position) {
  return board.querySelector(`[data-index="${position}"]`);
}

function isCurrentCellVisible() {
  const currentCell = getCurrentCellElement();
  if (!currentCell) {
    return false;
  }

  const wrapRect = boardWrap.getBoundingClientRect();
  const cellRect = currentCell.getBoundingClientRect();
  const margin = 12;
  return (
    cellRect.top < wrapRect.bottom - margin &&
    cellRect.bottom > wrapRect.top + margin &&
    cellRect.left < wrapRect.right - margin &&
    cellRect.right > wrapRect.left + margin
  );
}

function updateReturnCurrentButton() {
  const currentVisible = isCurrentCellVisible();
  const showOverviewAction = currentVisible && !viewState.overviewMode;
  returnCurrentBtn.textContent = showOverviewAction ? "見渡す" : "現在地";
  returnCurrentBtn.setAttribute(
    "aria-label",
    showOverviewAction ? "盤面全体を見渡す" : "通常サイズで現在地へ戻る"
  );
  returnCurrentBtn.classList.add("is-visible");
}

function calculateOverviewCellSize(layout) {
  const buttonWidth = returnCurrentBtn.offsetWidth || 92;
  const buttonHeight = returnCurrentBtn.offsetHeight || 44;
  const horizontalReserve = isRowMode() ? buttonWidth + 28 : 24;
  const verticalReserve = isRowMode() ? 24 : buttonHeight + 28;
  const availableWidth = Math.max(1, boardWrap.clientWidth - horizontalReserve);
  const availableHeight = Math.max(1, boardWrap.clientHeight - verticalReserve);
  const widthForCells = availableWidth - Math.max(0, layout.columns - 1) * OVERVIEW_GAP;
  const heightForCells = availableHeight - Math.max(0, layout.rows - 1) * OVERVIEW_GAP;
  return Math.max(
    4,
    Math.min(
      OVERVIEW_CELL_MAX,
      widthForCells / (
        layout.columns
        + (ROUTE_OUTER_MARGIN_RATIO + ROUTE_OUTLINE_HALF_RATIO) * 2
      ),
      heightForCells / (layout.rows + ROUTE_EDGE_PADDING_RATIO * 2)
    )
  );
}

function enterOverview() {
  if (gameState.isAnimating) {
    return;
  }
  viewState.overviewMode = true;
  renderBoard({ smoothFollow: false });
  boardWrap.scrollTo({ top: 0, left: 0, behavior: "auto" });
  updateReturnCurrentButton();
}

function exitOverview({ scrollCurrent = true } = {}) {
  viewState.overviewMode = false;
  viewState.viewZoom = 1;
  renderBoard({ smoothFollow: false });

  if (scrollCurrent) {
    window.requestAnimationFrame(() => {
      scrollToCurrent(false, { force: true });
      updateReturnCurrentButton();
    });
  }
}

function resetTemporaryView() {
  viewState.overviewMode = false;
  viewState.viewZoom = 1;
}

function ensurePlayerToken() {
  if (playerToken && playerToken.isConnected) {
    return playerToken;
  }

  playerToken = document.createElement("div");
  playerToken.className = "player-token is-instant";
  playerToken.setAttribute("aria-hidden", "true");
  board.appendChild(playerToken);
  return playerToken;
}

function positionPlayerToken(animate = false) {
  const token = ensurePlayerToken();
  const currentCell = getCurrentCellElement();
  if (!currentCell) {
    return;
  }

  const shouldAnimate = animate && !reducedMotionQuery.matches;
  token.classList.toggle("is-instant", !shouldAnimate);

  const tokenWidth = token.offsetWidth || 22;
  const x = currentCell.offsetLeft + currentCell.offsetWidth - tokenWidth - TOKEN_EDGE_OFFSET;
  const y = currentCell.offsetTop + TOKEN_EDGE_OFFSET;
  token.style.setProperty("--token-x", `${Math.max(0, x)}px`);
  token.style.setProperty("--token-y", `${Math.max(0, y)}px`);

  if (!shouldAnimate) {
    token.getBoundingClientRect();
    window.requestAnimationFrame(() => {
      token.classList.remove("is-instant");
    });
  }
}

function updateCurrentCell(prevPosition, nextPosition) {
  getCurrentCellElement(prevPosition)?.classList.remove("current");
  getCurrentCellElement(nextPosition)?.classList.add("current");
  updateProgressCells();
  renderBoardRoute();
}

function updatePositionView(prevPosition, options = { animateToken: false, smoothFollow: false }) {
  updateCurrentCell(prevPosition, gameState.position);
  updateStatus();
  positionPlayerToken(options.animateToken);
  updateReturnCurrentButton();

  if (shouldFollowCurrent()) {
    scrollToCurrent(options.smoothFollow);
  }
}

function renderBoard(options = { smoothFollow: false }) {
  applyViewClasses();
  applyCellScaleControl();
  updateCustomControls();
  const layout = getBoardLayout();
  board.dataset.cols = String(layout.columns);
  const layoutClass = viewState.overviewMode
    ? "overview-map"
    : isRowMode()
      ? "horizontal"
      : layout.columns === 1
        ? "single"
        : layout.columns === 5
          ? "tall"
          : "wide";
  board.classList.remove("wide", "tall", "single", "horizontal", "overview-map", "responsive", "fixed");
  board.classList.add(layoutClass, "fixed");
  board.innerHTML = "";
  playerToken = null;

  layout.items.forEach(({ index: idx, row, col }) => {
    const data = gameState.cells[idx];
    const cell = document.createElement("div");
    cell.dataset.index = String(idx);
    cell.className = `cell ${data.kind}`;
    cell.style.gridRow = String(row);
    cell.style.gridColumn = String(col);

    if (idx === gameState.position) {
      cell.classList.add("current");
    }
    if (idx < gameState.position) {
      cell.classList.add("visited");
    }

    const marker = data.kind === "start" ? "START" : data.kind === "goal" ? "GOAL" : "";
    const label = marker || data.weapon;
    const imageSrc = marker ? "" : getCellImageSrc(data);
    const bodyClass = marker ? "marker-label" : imageSrc ? "image-label" : "weapon-label";
    const bodyContent = marker
      ? escapeHtml(label)
      : imageSrc
        ? `<img class="cell-image" src="${escapeHtml(imageSrc)}" alt="${escapeHtml(label)}" loading="lazy" decoding="async" />`
        : escapeHtml(data.weapon);

    if (imageSrc) {
      cell.classList.add("has-image");
    }

    cell.setAttribute("title", label);
    cell.setAttribute("aria-label", `${idx}: ${label}`);
    cell.innerHTML = `
      <div class="${bodyClass}">${bodyContent}</div>
    `;

    board.appendChild(cell);
  });

  updateProgressCells();
  updateStatus();
  applyBoardScale();
  positionPlayerToken(false);
  updateReturnCurrentButton();

  if (shouldFollowCurrent()) {
    window.requestAnimationFrame(() => {
      scrollToCurrent(options.smoothFollow);
      window.requestAnimationFrame(updateReturnCurrentButton);
    });
  }
}

function updateStatus() {
  debugInfoLine.classList.toggle("hidden", !viewState.debugInfo);
  const current = gameState.cells[gameState.position];
  positionText.textContent = `${gameState.position} / ${GOAL}`;

  const typeLabel = {
    start: "スタート",
    goal: "ゴール",
    main: "通常マス（メイン）",
    sub: "5の倍数マス（サブ）",
    special: "5の倍数マス（スペシャル）"
  };

  cellType.textContent = typeLabel[current.kind];
  weaponText.textContent = current.weapon;
  weaponText.title = current.weapon;
  cellType.title = typeLabel[current.kind];
}

function closeGoalDialog() {
  if (goalDialog.open) {
    goalDialog.close();
  }
}

function showGoalDialog() {
  if (typeof goalDialog.showModal === "function") {
    goalDialog.showModal();
    return;
  }

  goalDialog.setAttribute("open", "");
}

function updateUndoButton() {
  undoBtn.disabled = gameState.isAnimating || gameState.history.length === 0;
}

function pushHistory(diceText = diceResult.textContent) {
  gameState.history.push({
    position: gameState.position,
    diceText
  });
  updateUndoButton();
}

function clearHistory() {
  gameState.history = [];
  updateUndoButton();
}

async function undoLastMove() {
  if (gameState.isAnimating || gameState.history.length === 0) {
    return;
  }

  if (viewState.overviewMode) {
    exitOverview({ scrollCurrent: true });
  }
  closeGoalDialog();
  const previousState = gameState.history.pop();
  const target = previousState.position;

  gameState.isAnimating = true;
  setControlsDisabled(true);

  const isWideTwoPane = isWideTwoPaneLayout();
  const isCompactViewport = window.matchMedia("(max-width: 640px)").matches;
  const cols = getDisplayCols();
  const smoothFollow = isRowMode() || cols === 1 || (!isWideTwoPane && !isCompactViewport);
  const stepDelay = reducedMotionQuery.matches ? 30 : UNDO_STEP_MS;

  while (gameState.position > target) {
    const prevPosition = gameState.position;
    gameState.position -= 1;
    updatePositionView(prevPosition, { animateToken: true, smoothFollow });
    await wait(stepDelay);
  }

  diceResult.textContent = previousState.diceText;
  gameState.isAnimating = false;
  setControlsDisabled(false);
  updateUndoButton();
}

function closeMoreActions() {
  if (moreActions) {
    moreActions.open = false;
  }
}

function resetGame() {
  closeGoalDialog();
  closeMoreActions();
  clearHistory();
  gameState.position = 0;
  diceResult.textContent = "出目: -";
  renderBoard({ smoothFollow: false });
}

function regenerateGame() {
  closeGoalDialog();
  closeMoreActions();
  clearHistory();
  buildCells();
  gameState.position = 0;
  diceResult.textContent = "出目: -";
  renderBoard({ smoothFollow: false });
}

function confirmRegenerateGame() {
  if (window.confirm("盤面を再生成しますか？現在の進行状況はリセットされます。")) {
    regenerateGame();
  }
}

async function move(step, options = {}) {
  if (gameState.isAnimating) {
    return;
  }

  const value = Number(step);
  if (!Number.isFinite(value) || value < 0) {
    return;
  }

  if (value === 0) {
    return;
  }

  const target = Math.min(GOAL, gameState.position + value);
  if (target === gameState.position) {
    return;
  }

  if (viewState.overviewMode) {
    exitOverview({ scrollCurrent: true });
  }
  pushHistory(options.historyDiceText ?? diceResult.textContent);
  gameState.isAnimating = true;
  setControlsDisabled(true);
  const isWideTwoPane = isWideTwoPaneLayout();
  const isCompactViewport = window.matchMedia("(max-width: 640px)").matches;
  const cols = getDisplayCols();
  const smoothFollow = isRowMode() || cols === 1 || (!isWideTwoPane && !isCompactViewport);
  const stepDelay = reducedMotionQuery.matches ? 60 : MOVE_STEP_MS;

  while (gameState.position < target) {
    const prevPosition = gameState.position;
    gameState.position += 1;
    updatePositionView(prevPosition, { animateToken: true, smoothFollow });
    await wait(stepDelay);
  }

  gameState.isAnimating = false;
  setControlsDisabled(false);

  if (gameState.position === GOAL) {
    window.setTimeout(() => {
      showGoalDialog();
    }, 10);
  }
}

function onManualMove() {
  const v = Number(manualStepInput.value);
  if (!Number.isFinite(v) || v < 0) {
    alert("0以上の数値を入力してください。");
    return;
  }

  move(v);
}

function updateCustomControls() {
  displayPresets.forEach((radio) => {
    radio.checked = radio.value === viewState.preset;
  });
  screenLayouts.forEach((radio) => {
    radio.checked = radio.value === viewState.screenLayout;
  });
  panelPositions.forEach((radio) => {
    radio.checked = radio.value === viewState.panelPosition;
  });
  travelDirections.forEach((radio) => {
    radio.checked = radio.value === viewState.direction;
  });
  wrapDirections.forEach((radio) => {
    radio.checked = radio.value === viewState.wrapDirection;
  });

  panelPositionOptions.querySelectorAll("[data-layout-option]").forEach((label) => {
    label.classList.toggle("hidden", label.dataset.layoutOption !== viewState.screenLayout);
  });

  const directionType = ["right", "left"].includes(viewState.direction) ? "horizontal" : "vertical";
  wrapDirectionOptions.querySelectorAll("[data-direction-option]").forEach((label) => {
    const hidden = label.dataset.directionOption !== directionType;
    label.classList.toggle("hidden", hidden);
    label.querySelector("input").disabled = hidden || viewState.wrapCount === 0 || gameState.isAnimating;
  });

  wrapEnabledInput.checked = viewState.wrapCount > 0;
  wrapCountInput.disabled = viewState.wrapCount === 0 || gameState.isAnimating;
  if (viewState.wrapCount > 0) {
    wrapCountInput.value = String(viewState.wrapCount);
  }
  applyCellScaleControl();
}

function applyViewChange() {
  resetTemporaryView();
  normalizeViewState();
  syncPresetSelection();
  savePrefs();
  renderBoard({ smoothFollow: false });
}

displayPresets.forEach((radio) => {
  radio.addEventListener("change", () => {
    if (radio.value === "custom") {
      viewState.preset = "custom";
      customDisplayDetails.open = true;
      savePrefs();
      updateCustomControls();
      return;
    }
    customDisplayDetails.open = false;
    resetTemporaryView();
    const currentCellScale = viewState.cellScale;
    Object.assign(viewState, DISPLAY_PRESETS[radio.value], {
      preset: radio.value,
      cellScale: currentCellScale
    });
    savePrefs();
    renderBoard({ smoothFollow: false });
  });
});

followCurrent.addEventListener("change", (e) => {
  viewState.followCurrent = e.target.checked;
  savePrefs();
  if (shouldFollowCurrent()) {
    scrollToCurrent(false);
  }
});

screenLayouts.forEach((radio) => {
  radio.addEventListener("change", () => {
    const previousPosition = viewState.panelPosition;
    viewState.screenLayout = radio.value;
    viewState.panelPosition = radio.value === "horizontal"
      ? previousPosition === "bottom" ? "right" : "left"
      : previousPosition === "right" ? "bottom" : "top";
    applyViewChange();
  });
});

panelPositions.forEach((radio) => {
  radio.addEventListener("change", () => {
    viewState.panelPosition = radio.value;
    applyViewChange();
  });
});

travelDirections.forEach((radio) => {
  radio.addEventListener("change", () => {
    const wasHorizontal = ["right", "left"].includes(viewState.direction);
    const willBeHorizontal = ["right", "left"].includes(radio.value);
    viewState.direction = radio.value;
    if (wasHorizontal !== willBeHorizontal) {
      viewState.wrapDirection = willBeHorizontal ? "up" : "right";
    }
    applyViewChange();
  });
});

wrapDirections.forEach((radio) => {
  radio.addEventListener("change", () => {
    viewState.wrapDirection = radio.value;
    applyViewChange();
  });
});

wrapEnabledInput.addEventListener("change", () => {
  viewState.wrapCount = wrapEnabledInput.checked
    ? clampWrapCount(wrapCountInput.value)
    : 0;
  applyViewChange();
});

wrapCountInput.addEventListener("change", () => {
  const value = Number(wrapCountInput.value);
  if (!Number.isFinite(value) || value < 1) {
    wrapCountInput.value = String(viewState.wrapCount || 10);
    return;
  }
  viewState.wrapCount = clampWrapCount(value);
  applyViewChange();
});

inputModes.forEach((radio) => {
  radio.addEventListener("change", () => applyInputMode(radio.value));
});

settingsBtn.addEventListener("click", () => {
  closeMoreActions();
  settingsDialog.scrollTop = 0;
  settingsDialog.showModal();
});
closeSettingsBtn.addEventListener("click", () => settingsDialog.close());

settingsDialog.addEventListener("close", () => {
  settingsBtn.focus({ preventScroll: true });
});

settingsDialog.addEventListener("pointerdown", (event) => {
  if (event.target !== settingsDialog) {
    return;
  }

  const rect = settingsDialog.getBoundingClientRect();
  const clickedOutside =
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom;

  if (clickedOutside) {
    settingsDialog.close();
  }
});

document.addEventListener("pointerdown", (event) => {
  if (moreActions.open && !moreActions.contains(event.target)) {
    closeMoreActions();
  }
});

returnCurrentBtn.addEventListener("click", () => {
  if (viewState.overviewMode) {
    exitOverview({ scrollCurrent: true });
    return;
  }
  if (isCurrentCellVisible()) {
    enterOverview();
    return;
  }
  scrollToCurrent(true, { force: true });
  window.setTimeout(updateReturnCurrentButton, 350);
});

squidColorInput.addEventListener("input", () => {
  const valid = /^#[0-9a-fA-F]{6}$/.test(squidColorInput.value);
  squidColorInput.setAttribute("aria-invalid", String(!valid));
  if (!valid) return;
  viewState.squidColor = squidColorInput.value;
  applyTheme();
  savePrefs();
});

colorPresets.forEach((radio) => {
  radio.addEventListener("change", () => {
    viewState.squidColor = radio.value;
    squidColorInput.value = radio.value;
    squidColorInput.setAttribute("aria-invalid", "false");
    applyTheme();
    savePrefs();
  });
});

debugInfoInput.addEventListener("change", () => {
  viewState.debugInfo = debugInfoInput.checked;
  updateStatus();
  savePrefs();
});

cellScaleInput.addEventListener("input", (e) => {
  resetTemporaryView();
  viewState.cellScale = clampCellScale(e.target.value);
  syncPresetSelection();
  updateCustomControls();
  savePrefs();
  applyCellSize();
});

rollBtn.addEventListener("click", () => {
  if (gameState.isAnimating || gameState.position >= GOAL) {
    return;
  }
  const previousDiceText = diceResult.textContent;
  const roll = Math.floor(Math.random() * 6) + 1;
  diceResult.textContent = `出目: ${roll}`;
  void move(roll, { historyDiceText: previousDiceText });
});

manualMoveBtn.addEventListener("click", () => {
  onManualMove();
});

manualStepInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    onManualMove();
  }
});

undoBtn.addEventListener("click", () => {
  void undoLastMove();
});

resetBtn.addEventListener("click", resetGame);

regenBtn.addEventListener("click", confirmRegenerateGame);

goalUndoBtn.addEventListener("click", () => {
  void undoLastMove();
});

goalResetBtn.addEventListener("click", resetGame);

goalRegenBtn.addEventListener("click", confirmRegenerateGame);

goalCloseBtn.addEventListener("click", closeGoalDialog);

function refreshBoardLayout() {
  applyBoardScale();
  positionPlayerToken(false);
  updateReturnCurrentButton();
  if (shouldFollowCurrent()) {
    scrollToCurrent(false);
  }
}

window.addEventListener("resize", refreshBoardLayout);
// Scrollbar and narrow-layout changes also affect the available cell height.
const boardResizeObserver = new ResizeObserver(() => {
  refreshBoardLayout();
});
boardResizeObserver.observe(boardWrap);

boardWrap.addEventListener("scroll", () => {
  window.requestAnimationFrame(updateReturnCurrentButton);
});

applyPrefs();
savePrefs();
followCurrent.checked = viewState.followCurrent;
debugInfoInput.checked = viewState.debugInfo;
squidColorInput.value = viewState.squidColor;
applyTheme();
updateCustomControls();
updateUndoButton();

buildCells();
renderBoard({ smoothFollow: false });
void loadImageMaps();
