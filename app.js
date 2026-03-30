const GOAL = 100;
const STORAGE_KEY = "splatoon3_sugoroku_prefs";
const RAW_MANIFEST_PATH = "data/raw-manifest.json";
const SUB_IMAGE_MAP_PATH = "data/sub-image-map.json";
const SPECIAL_IMAGE_MAP_PATH = "data/special-image-map.json";

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
  followCurrent: true,
  squidColor: "#22d3ee",
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
const resetBtn = document.getElementById("resetBtn");
const regenBtn = document.getElementById("regenBtn");
const positionText = document.getElementById("positionText");
const cellType = document.getElementById("cellType");
const weaponText = document.getElementById("weaponText");

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
      squidColor: state.squidColor
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

  if (["auto", "5", "10", "15", "20"].includes(prefs.displayMode)) {
    state.displayMode = prefs.displayMode;
  }

  if (typeof prefs.squidColor === "string" && /^#[0-9a-fA-F]{6}$/.test(prefs.squidColor)) {
    state.squidColor = prefs.squidColor;
  }
}

function applyTheme() {
  document.documentElement.style.setProperty("--squid-color", state.squidColor);
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

function getDisplayCols() {
  if (state.displayMode !== "auto") {
    return Number(state.displayMode);
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

function scrollToCurrent(smooth) {
  const cols = getDisplayCols();
  const isWideTwoPane = isWideTwoPaneLayout();
  // In wide two-pane layout, 10/15/20 columns are usually fully visible.
  if (isFollowSuppressedByLayout(cols)) {
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

  if (state.displayMode === "auto") {
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

function renderBoard(options = { smoothFollow: false }) {
  const cols = getDisplayCols();
  updateFollowNote(cols);
  board.dataset.cols = String(cols);
  const layoutClass = cols === 5 ? "tall" : "wide";
  const fitModeClass = state.displayMode === "auto" ? "responsive" : "fixed";
  board.classList.remove("wide", "tall", "responsive", "fixed");
  board.classList.add(layoutClass, fitModeClass);
  if (state.displayMode !== "auto") {
    const colSize = cols === 5 ? 72 : 58;
    board.style.gridTemplateColumns = `repeat(${cols}, ${colSize}px)`;
  } else {
    board.style.gridTemplateColumns = `repeat(${cols}, minmax(0, 1fr))`;
  }
  board.innerHTML = "";

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
    const token = idx === state.position ? `<div class="player-token" aria-hidden="true"></div>` : "";
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
      ${token}
    `;

    board.appendChild(cell);
  });

  updateStatus();
  applyBoardScale();

  if (state.followCurrent) {
    window.requestAnimationFrame(() => {
      scrollToCurrent(options.smoothFollow);
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
  state.isAnimating = true;
  setControlsDisabled(true);
  const isWideTwoPane = isWideTwoPaneLayout();
  const isCompactViewport = window.matchMedia("(max-width: 900px)").matches;
  const smoothFollow = !isWideTwoPane && !isCompactViewport;

  while (state.position < target) {
    state.position += 1;
    // Keep smooth follow on larger single-pane layouts, but use instant follow on compact screens.
    renderBoard({ smoothFollow });
    await wait(130);
  }

  state.isAnimating = false;
  setControlsDisabled(false);

  if (state.position === GOAL) {
    window.setTimeout(() => {
      alert("ゴール！おめでとう！");
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
  if (state.followCurrent) {
    scrollToCurrent(false);
  }
});

squidColorInput.addEventListener("input", (e) => {
  state.squidColor = e.target.value;
  applyTheme();
  savePrefs();
});

inputMode.addEventListener("change", (e) => {
  const diceMode = e.target.value === "dice";
  diceBox.classList.toggle("hidden", !diceMode);
  manualBox.classList.toggle("hidden", diceMode);
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

resetBtn.addEventListener("click", () => {
  state.position = 0;
  diceResult.textContent = "出目: -";
  renderBoard({ smoothFollow: false });
});

regenBtn.addEventListener("click", () => {
  buildCells();
  state.position = 0;
  diceResult.textContent = "出目: -";
  renderBoard({ smoothFollow: false });
});

window.addEventListener("resize", () => {
  const nextWideCols = getDisplayCols();
  const colsChanged = state.displayMode === "auto" && state.wideCols !== nextWideCols;

  if (colsChanged) {
    renderBoard({ smoothFollow: false });
    return;
  }

  applyBoardScale();
  if (state.followCurrent) {
    scrollToCurrent(false);
  }
});

applyPrefs();
displayModeSelect.value = state.displayMode;
squidColorInput.value = state.squidColor;
applyTheme();

buildCells();
renderBoard({ smoothFollow: false });
void loadImageMaps();
