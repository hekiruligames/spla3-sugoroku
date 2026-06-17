const GOAL = 100;
const STORAGE_KEY = "splatoon3_sugoroku_prefs";
const RAW_MANIFEST_PATH = "data/raw-manifest.json";
const SUB_IMAGE_MAP_PATH = "data/sub-image-map.json";
const SPECIAL_IMAGE_MAP_PATH = "data/special-image-map.json";
const MOVE_STEP_MS = 160;
const TOKEN_EDGE_OFFSET = 2;
const SINGLE_COL_BASE_SIZE = 96;
const SINGLE_COL_SCALE_MIN = 1;
const SINGLE_COL_SCALE_MAX = 3;
const SINGLE_COL_SCALE_DEFAULT = 1.5;

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

const state = {
  position: 0,
  displayMode: "auto",
  obsMode: new URLSearchParams(window.location.search).get("view") === "obs",
  followCurrent: true,
  squidColor: "#22d3ee",
  singleColScale: SINGLE_COL_SCALE_DEFAULT,
  isAnimating: false,
  wideCols: 20,
  cells: []
};

const board = document.getElementById("board");
const boardWrap = document.getElementById("boardWrap");
const boardViewport = document.getElementById("boardViewport");
const displayModeSelect = document.getElementById("displayMode");
const followCurrent = document.getElementById("followCurrent");
const followCurrentNote = document.getElementById("followCurrentNote");
const squidColorInput = document.getElementById("squidColor");
const inputMode = document.getElementById("inputMode");
const diceBox = document.getElementById("diceBox");
const manualBox = document.getElementById("manualBox");
const manualStepInput = document.getElementById("manualStepInput");
const manualMoveBtn = document.getElementById("manualMoveBtn");
const rollBtn = document.getElementById("rollBtn");
const diceResult = document.getElementById("diceResult");
const obsToggleBtn = document.getElementById("obsToggleBtn");
const returnCurrentBtn = document.getElementById("returnCurrentBtn");
const resetBtn = document.getElementById("resetBtn");
const regenBtn = document.getElementById("regenBtn");
const singleColScaleInput = document.getElementById("singleColScale");
const singleColScaleValue = document.getElementById("singleColScaleValue");
const positionText = document.getElementById("positionText");
const cellType = document.getElementById("cellType");
const weaponText = document.getElementById("weaponText");
const goalDialog = document.getElementById("goalDialog");
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
      displayMode: state.displayMode,
      squidColor: state.squidColor,
      singleColScale: state.singleColScale
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // Ignore storage errors (private mode / quota).
  }
}

function applyPrefs() {
  const prefs = loadPrefs();
  if (!prefs) {
    return;
  }

  if (["auto", "1", "5", "10", "15", "20"].includes(prefs.displayMode)) {
    state.displayMode = prefs.displayMode;
  }

  if (typeof prefs.squidColor === "string" && /^#[0-9a-fA-F]{6}$/.test(prefs.squidColor)) {
    state.squidColor = prefs.squidColor;
  }

  const scale = Number(prefs.singleColScale);
  if (Number.isFinite(scale)) {
    state.singleColScale = clampSingleColScale(scale);
  }
}

function applyTheme() {
  document.documentElement.style.setProperty("--squid-color", state.squidColor);
}

function clampSingleColScale(value) {
  return Math.min(SINGLE_COL_SCALE_MAX, Math.max(SINGLE_COL_SCALE_MIN, value));
}

function formatSingleColScale(value) {
  return `${value.toFixed(1)}倍`;
}

function applySingleColScaleControl() {
  singleColScaleInput.value = String(state.singleColScale);
  singleColScaleValue.textContent = formatSingleColScale(state.singleColScale);
}

function applySingleColSize() {
  if (getDisplayCols() !== 1) {
    return;
  }

  const colSize = getFixedCellSize(1);
  board.style.gridTemplateColumns = `repeat(1, ${colSize}px)`;
  applyBoardScale();
  positionPlayerToken(false);
  updateReturnCurrentButton();

  if (shouldFollowCurrent()) {
    scrollToCurrent(false);
  }
}

function applyObsMode() {
  document.body.classList.toggle("obs-mode", state.obsMode);
  obsToggleBtn.textContent = state.obsMode ? "通常表示に戻る" : "OBS表示";
  obsToggleBtn.setAttribute("aria-pressed", String(state.obsMode));
}

function setControlsDisabled(disabled) {
  const controls = [
    displayModeSelect,
    followCurrent,
    squidColorInput,
    inputMode,
    manualStepInput,
    rollBtn,
    manualMoveBtn,
    obsToggleBtn,
    returnCurrentBtn,
    singleColScaleInput,
    resetBtn,
    regenBtn
  ];
  controls.forEach((el) => {
    el.disabled = disabled;
  });
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

  state.cells = cells;
}

function buildSerpentineOrder(total, cols) {
  const order = [];
  const rows = Math.ceil((total + 1) / cols);
  let n = 0;

  for (let r = 0; r < rows; r += 1) {
    const row = [];
    for (let c = 0; c < cols; c += 1) {
      if (n > total) {
        break;
      }
      row.push(n);
      n += 1;
    }

    if (r % 2 === 1) {
      row.reverse();
    }

    order.push(...row);
  }

  return order;
}

function getEffectiveDisplayMode() {
  return state.displayMode;
}

function shouldFollowCurrent() {
  return state.followCurrent;
}

function getDisplayCols() {
  const mode = getEffectiveDisplayMode();
  if (mode !== "auto") {
    return Number(mode);
  }

  // Auto mode should react to the board area width, not the full window width.
  const boardWidth = boardWrap?.clientWidth ?? 0;
  const width = boardWidth > 0 ? boardWidth : window.innerWidth;
  if (width <= 520) {
    return 5;
  }
  if (width <= 820) {
    return 10;
  }
  if (width <= 1120) {
    return 15;
  }
  return 20;
}

function getBoardOrder() {
  const cols = getDisplayCols();
  state.wideCols = cols;
  if (cols === 1) {
    return Array.from({ length: GOAL + 1 }, (_, idx) => GOAL - idx);
  }
  return buildSerpentineOrder(GOAL, cols);
}

function isWideTwoPaneLayout() {
  return window.matchMedia("(min-width: 1200px) and (min-aspect-ratio: 4/3)").matches;
}

function isFollowSuppressedByLayout(cols = getDisplayCols()) {
  return isWideTwoPaneLayout() && cols >= 10;
}

function updateFollowNote(cols = getDisplayCols()) {
  if (!followCurrentNote) {
    return;
  }
  followCurrentNote.classList.toggle("hidden", !isFollowSuppressedByLayout(cols));
}

function scrollToCurrent(smooth, options = {}) {
  const cols = getDisplayCols();
  const isWideTwoPane = isWideTwoPaneLayout();
  // In wide two-pane layout, 10/15/20 columns are usually fully visible.
  if (!options.force && isFollowSuppressedByLayout(cols)) {
    return;
  }

  const currentCell = board.querySelector(`[data-index="${state.position}"]`);
  if (!currentCell) {
    return;
  }

  const wrapRect = boardWrap.getBoundingClientRect();
  const cellRect = currentCell.getBoundingClientRect();
  const onePaneTopMargin = 8;
  const twoPaneTopMargin = Math.max(8, cellRect.height * 0.2);

  if (cols === 1) {
    const targetTop = boardWrap.scrollTop + (cellRect.top - wrapRect.top) - wrapRect.height / 2 + cellRect.height / 2;
    const targetLeft = boardWrap.scrollLeft + (cellRect.left - wrapRect.left) - wrapRect.width / 2 + cellRect.width / 2;
    boardWrap.scrollTo({
      top: Math.max(0, targetTop),
      left: Math.max(0, targetLeft),
      behavior: smooth ? "smooth" : "auto"
    });
    return;
  }

  if (!isWideTwoPane) {
    // One-pane layout: always pin current cell near the first row.
    const targetTop = boardWrap.scrollTop + (cellRect.top - wrapRect.top) - onePaneTopMargin;
    boardWrap.scrollTo({
      top: Math.max(0, targetTop),
      left: boardWrap.scrollLeft,
      behavior: smooth ? "smooth" : "auto"
    });
    return;
  }

  if (isWideTwoPane) {
    const bottomMargin = 8;
    const sideMargin = 8;
    const alreadyVisibleY = cellRect.top >= wrapRect.top + twoPaneTopMargin && cellRect.bottom <= wrapRect.bottom - bottomMargin;
    const alreadyVisibleX = cellRect.left >= wrapRect.left + sideMargin && cellRect.right <= wrapRect.right - sideMargin;
    if (alreadyVisibleX && alreadyVisibleY) {
      return;
    }
  }

  // Keep current cell near the first row.
  const targetTop = boardWrap.scrollTop + (cellRect.top - wrapRect.top) - twoPaneTopMargin;
  const targetLeft = isWideTwoPane
    ? boardWrap.scrollLeft + (cellRect.left - wrapRect.left) - wrapRect.width / 2 + cellRect.width / 2
    : boardWrap.scrollLeft;

  boardWrap.scrollTo({
    top: Math.max(0, targetTop),
    left: Math.max(0, targetLeft),
    behavior: smooth ? "smooth" : "auto"
  });
}

function applyBoardScale() {
  board.style.transform = "scale(1)";
  boardViewport.style.minHeight = "";
  const tailSpace = Math.max(120, Math.floor(boardWrap.clientHeight * 0.9));
  boardViewport.style.paddingBottom = `${tailSpace}px`;

  if (getEffectiveDisplayMode() === "auto") {
    return;
  }

  const contentWidth = board.scrollWidth;
  const availableWidth = Math.max(0, boardWrap.clientWidth - 12);
  if (!contentWidth || !availableWidth) {
    return;
  }

  const scale = Math.min(1, availableWidth / contentWidth);
  board.style.transform = `scale(${scale})`;
  boardViewport.style.minHeight = `${board.offsetHeight * scale + 8}px`;
}

function getSingleColCellSize() {
  const scaledSize = Math.round(SINGLE_COL_BASE_SIZE * state.singleColScale);
  const availableWidth = Math.max(64, boardWrap.clientWidth - 24);
  return Math.min(scaledSize, availableWidth);
}

function getFixedCellSize(cols) {
  if (cols === 1) {
    return getSingleColCellSize();
  }
  if (cols === 5) {
    return 72;
  }
  return 58;
}

function getCurrentCellElement(position = state.position) {
  return board.querySelector(`[data-index="${position}"]`);
}

function updateReturnCurrentButton() {
  const currentCell = getCurrentCellElement();
  if (!currentCell) {
    return;
  }

  const wrapRect = boardWrap.getBoundingClientRect();
  const cellRect = currentCell.getBoundingClientRect();
  const margin = 12;
  returnCurrentBtn.textContent = cellRect.top >= wrapRect.bottom - margin ? "↓" : "↑";
  const currentVisible =
    cellRect.top < wrapRect.bottom - margin &&
    cellRect.bottom > wrapRect.top + margin &&
    cellRect.left < wrapRect.right - margin &&
    cellRect.right > wrapRect.left + margin;

  returnCurrentBtn.classList.toggle("is-visible", !currentVisible);
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
}

function updatePositionView(prevPosition, options = { animateToken: false, smoothFollow: false }) {
  updateCurrentCell(prevPosition, state.position);
  updateStatus();
  positionPlayerToken(options.animateToken);
  updateReturnCurrentButton();

  if (shouldFollowCurrent()) {
    scrollToCurrent(options.smoothFollow);
  }
}

function renderBoard(options = { smoothFollow: false }) {
  const cols = getDisplayCols();
  const effectiveMode = getEffectiveDisplayMode();
  updateFollowNote(cols);
  board.dataset.cols = String(cols);
  const layoutClass = cols === 1 ? "single" : cols === 5 ? "tall" : "wide";
  const fitModeClass = effectiveMode === "auto" ? "responsive" : "fixed";
  board.classList.remove("wide", "tall", "single", "responsive", "fixed");
  board.classList.add(layoutClass, fitModeClass);
  if (cols === 1) {
    const colSize = getFixedCellSize(cols);
    board.style.gridTemplateColumns = `repeat(${cols}, ${colSize}px)`;
  } else if (effectiveMode !== "auto") {
    const colSize = getFixedCellSize(cols);
    board.style.gridTemplateColumns = `repeat(${cols}, ${colSize}px)`;
  } else {
    board.style.gridTemplateColumns = `repeat(${cols}, minmax(0, 1fr))`;
  }
  board.innerHTML = "";
  playerToken = null;

  const order = getBoardOrder();

  order.forEach((idx) => {
    const data = state.cells[idx];
    const cell = document.createElement("div");
    cell.dataset.index = String(idx);
    cell.className = `cell ${data.kind}`;

    if (idx === state.position) {
      cell.classList.add("current");
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
  const current = state.cells[state.position];
  positionText.textContent = `${state.position} / ${GOAL}`;

  const typeLabel = {
    start: "スタート",
    goal: "ゴール",
    main: "通常マス（メイン）",
    sub: "5の倍数マス（サブ）",
    special: "5の倍数マス（スペシャル）"
  };

  cellType.textContent = typeLabel[current.kind];
  weaponText.textContent = current.weapon;
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

function resetGame() {
  closeGoalDialog();
  state.position = 0;
  diceResult.textContent = "出目: -";
  renderBoard({ smoothFollow: false });
}

function regenerateGame() {
  closeGoalDialog();
  buildCells();
  state.position = 0;
  diceResult.textContent = "出目: -";
  renderBoard({ smoothFollow: false });
}

async function move(step) {
  if (state.isAnimating) {
    return;
  }

  const value = Number(step);
  if (!Number.isFinite(value) || value < 0) {
    return;
  }

  if (value === 0) {
    return;
  }

  const target = Math.min(GOAL, state.position + value);
  if (target === state.position) {
    return;
  }

  state.isAnimating = true;
  setControlsDisabled(true);
  const isWideTwoPane = isWideTwoPaneLayout();
  const isCompactViewport = window.matchMedia("(max-width: 900px)").matches;
  const cols = getDisplayCols();
  const smoothFollow = cols === 1 || (!isWideTwoPane && !isCompactViewport);
  const stepDelay = reducedMotionQuery.matches ? 60 : MOVE_STEP_MS;

  while (state.position < target) {
    const prevPosition = state.position;
    state.position += 1;
    updatePositionView(prevPosition, { animateToken: true, smoothFollow });
    await wait(stepDelay);
  }

  state.isAnimating = false;
  setControlsDisabled(false);

  if (state.position === GOAL) {
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

displayModeSelect.addEventListener("change", (e) => {
  state.displayMode = e.target.value;
  savePrefs();
  renderBoard({ smoothFollow: false });
});

followCurrent.addEventListener("change", (e) => {
  state.followCurrent = e.target.checked;
  if (shouldFollowCurrent()) {
    scrollToCurrent(false);
  }
});

inputMode.addEventListener("change", (e) => {
  const diceMode = e.target.value === "dice";
  diceBox.classList.toggle("hidden", !diceMode);
  manualBox.classList.toggle("hidden", diceMode);
});

obsToggleBtn.addEventListener("click", () => {
  state.obsMode = !state.obsMode;
  applyObsMode();
  renderBoard({ smoothFollow: false });
});

returnCurrentBtn.addEventListener("click", () => {
  scrollToCurrent(true, { force: true });
  window.setTimeout(updateReturnCurrentButton, 350);
});

squidColorInput.addEventListener("input", (e) => {
  state.squidColor = e.target.value;
  applyTheme();
  savePrefs();
});

singleColScaleInput.addEventListener("input", (e) => {
  const value = Number(e.target.value);
  state.singleColScale = clampSingleColScale(Number.isFinite(value) ? value : SINGLE_COL_SCALE_DEFAULT);
  applySingleColScaleControl();
  savePrefs();
  applySingleColSize();
});

rollBtn.addEventListener("click", () => {
  const roll = Math.floor(Math.random() * 6) + 1;
  diceResult.textContent = `出目: ${roll}`;
  void move(roll);
});

manualMoveBtn.addEventListener("click", () => {
  onManualMove();
});

manualStepInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    onManualMove();
  }
});

resetBtn.addEventListener("click", resetGame);

regenBtn.addEventListener("click", regenerateGame);

goalResetBtn.addEventListener("click", resetGame);

goalRegenBtn.addEventListener("click", regenerateGame);

goalCloseBtn.addEventListener("click", closeGoalDialog);

window.addEventListener("resize", () => {
  const nextWideCols = getDisplayCols();
  const colsChanged = getEffectiveDisplayMode() === "auto" && state.wideCols !== nextWideCols;

  if (colsChanged) {
    renderBoard({ smoothFollow: false });
    return;
  }

  applyBoardScale();
  positionPlayerToken(false);
  updateReturnCurrentButton();
  if (shouldFollowCurrent()) {
    scrollToCurrent(false);
  }
});

boardWrap.addEventListener("scroll", () => {
  window.requestAnimationFrame(updateReturnCurrentButton);
});

applyPrefs();
displayModeSelect.value = state.displayMode;
squidColorInput.value = state.squidColor;
applyTheme();
applySingleColScaleControl();
applyObsMode();

buildCells();
renderBoard({ smoothFollow: false });
void loadImageMaps();
