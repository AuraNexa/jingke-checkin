const STORAGE_KEY = "sutra-reader:v1";
const SCROLL_SPEED_PRESETS = {
  verySlow: 14,
  slow: 24,
  normal: 38,
  fast: 58,
  veryFast: 82
};
const MIN_SCROLL_SPEED = 12;
const MAX_SCROLL_SPEED = 88;
const DEFAULT_SCROLL_SPEED = SCROLL_SPEED_PRESETS.normal;
const DEFAULT_COUNTER_TARGET = 108;
const COUNTER_FEEDBACK_MODES = ["sound", "vibrate", "silent"];
const DEFAULT_COUNTER_FEEDBACK_MODE = "vibrate";

const HEART_SUTRA = {
  id: "heart-sutra",
  title: "般若波罗蜜多心经",
  shortTitle: "心经",
  source: "唐三藏法师玄奘译",
  text: `观自在菩萨，行深般若波罗蜜多时，照见五蕴皆空，度一切苦厄。

舍利子，色不异空，空不异色；色即是空，空即是色。受想行识，亦复如是。

舍利子，是诸法空相，不生不灭，不垢不净，不增不减。

是故空中无色，无受想行识，无眼耳鼻舌身意，无色声香味触法，无眼界，乃至无意识界；无无明，亦无无明尽；乃至无老死，亦无老死尽。无苦集灭道，无智亦无得。

以无所得故，菩提萨埵，依般若波罗蜜多故，心无挂碍；无挂碍故，无有恐怖，远离颠倒梦想，究竟涅槃。

三世诸佛，依般若波罗蜜多故，得阿耨多罗三藐三菩提。

故知般若波罗蜜多，是大神咒，是大明咒，是无上咒，是无等等咒，能除一切苦，真实不虚。

故说般若波罗蜜多咒，即说咒曰：

揭谛，揭谛，波罗揭谛，波罗僧揭谛，菩提萨婆诃。`
};

HEART_SUTRA.annotatedLines = [
  {
    note: "guān zì zài pú sà, xíng shēn bō rě bō luó mì duō shí, zhào jiàn wǔ yùn jiē kōng, dù yī qiè kǔ è.",
    text: "观自在菩萨，行深般若波罗蜜多时，照见五蕴皆空，度一切苦厄。"
  },
  {
    note: "shè lì zǐ, sè bú yì kōng, kōng bú yì sè; sè jí shì kōng, kōng jí shì sè. shòu xiǎng xíng shí, yì fù rú shì.",
    text: "舍利子，色不异空，空不异色；色即是空，空即是色。受想行识，亦复如是。"
  },
  {
    note: "shè lì zǐ, shì zhū fǎ kōng xiàng, bù shēng bù miè, bù gòu bù jìng, bù zēng bù jiǎn.",
    text: "舍利子，是诸法空相，不生不灭，不垢不净，不增不减。"
  },
  {
    note: "shì gù kōng zhōng wú sè, wú shòu xiǎng xíng shí.",
    text: "是故空中无色，无受想行识。"
  },
  {
    note: "wú yǎn ěr bí shé shēn yì, wú sè shēng xiāng wèi chù fǎ.",
    text: "无眼耳鼻舌身意，无色声香味触法。"
  },
  {
    note: "wú yǎn jiè, nǎi zhì wú yì shí jiè; wú wú míng, yì wú wú míng jìn.",
    text: "无眼界，乃至无意识界；无无明，亦无无明尽。"
  },
  {
    note: "nǎi zhì wú lǎo sǐ, yì wú lǎo sǐ jìn. wú kǔ jí miè dào, wú zhì yì wú dé.",
    text: "乃至无老死，亦无老死尽。无苦集灭道，无智亦无得。"
  },
  {
    note: "yǐ wú suǒ dé gù, pú tí sà duǒ, yī bō rě bō luó mì duō gù, xīn wú guà ài.",
    text: "以无所得故，菩提萨埵，依般若波罗蜜多故，心无挂碍。"
  },
  {
    note: "wú guà ài gù, wú yǒu kǒng bù, yuǎn lí diān dǎo mèng xiǎng, jiū jìng niè pán.",
    text: "无挂碍故，无有恐怖，远离颠倒梦想，究竟涅槃。"
  },
  {
    note: "sān shì zhū fó, yī bō rě bō luó mì duō gù, dé ā nòu duō luó sān miǎo sān pú tí.",
    text: "三世诸佛，依般若波罗蜜多故，得阿耨多罗三藐三菩提。"
  },
  {
    note: "gù zhī bō rě bō luó mì duō, shì dà shén zhòu, shì dà míng zhòu, shì wú shàng zhòu.",
    text: "故知般若波罗蜜多，是大神咒，是大明咒，是无上咒。"
  },
  {
    note: "shì wú děng děng zhòu, néng chú yī qiè kǔ, zhēn shí bù xū.",
    text: "是无等等咒，能除一切苦，真实不虚。"
  },
  {
    note: "gù shuō bō rě bō luó mì duō zhòu, jí shuō zhòu yuē:",
    text: "故说般若波罗蜜多咒，即说咒曰："
  },
  {
    note: "jiē dì, jiē dì, bō luó jiē dì, bō luó sēng jiē dì, pú tí sà pó hē.",
    text: "揭谛，揭谛，波罗揭谛，波罗僧揭谛，菩提萨婆诃。"
  }
];

const els = {
  readerShell: document.querySelector(".reader-shell"),
  todayLabel: document.querySelector("#todayLabel"),
  immersiveBar: document.querySelector("#immersiveBar"),
  resumeReadingButton: document.querySelector("#resumeReadingButton"),
  resumeReadingTitle: document.querySelector("#resumeReadingTitle"),
  resumeReadingProgress: document.querySelector("#resumeReadingProgress"),
  scriptureTabs: document.querySelector("#scriptureTabs"),
  chapterControls: document.querySelector("#chapterControls"),
  chapterPicker: document.querySelector("#chapterPicker"),
  chapterSelect: document.querySelector("#chapterSelect"),
  chapterCurrentTitle: document.querySelector("#chapterCurrentTitle"),
  viewButtons: Array.from(document.querySelectorAll("[data-view-target]")),
  readerPanel: document.querySelector("#readerPanel"),
  counterPanel: document.querySelector("#counterPanel"),
  prevChapterButton: document.querySelector("#prevChapterButton"),
  nextChapterButton: document.querySelector("#nextChapterButton"),
  chapterListButton: document.querySelector("#chapterListButton"),
  chapterSheet: document.querySelector("#chapterSheet"),
  chapterSheetClose: document.querySelector("#chapterSheetClose"),
  chapterSheetSummary: document.querySelector("#chapterSheetSummary"),
  chapterList: document.querySelector("#chapterList"),
  sheetBackdrop: document.querySelector("#sheetBackdrop"),
  readerTitle: document.querySelector("#readerTitle"),
  readerProgressText: document.querySelector("#readerProgressText"),
  readerRestoreToast: document.querySelector("#readerRestoreToast"),
  pinyinToggleButton: document.querySelector("#pinyinToggleButton"),
  restartReadingButton: document.querySelector("#restartReadingButton"),
  immersiveToggleButton: document.querySelector("#immersiveToggleButton"),
  scriptureText: document.querySelector("#scriptureText"),
  countFlash: document.querySelector("#countFlash"),
  timerMinutes: document.querySelector("#timerMinutes"),
  timerTime: document.querySelector("#timerTime"),
  timerState: document.querySelector("#timerState"),
  timerProgress: document.querySelector("#timerProgress"),
  timerCompletionMessage: document.querySelector("#timerCompletionMessage"),
  immersiveTimerTime: document.querySelector("#immersiveTimerTime"),
  immersiveTimerState: document.querySelector("#immersiveTimerState"),
  immersiveTimerProgress: document.querySelector("#immersiveTimerProgress"),
  timerToggleButton: document.querySelector("#timerToggleButton"),
  timerResetButton: document.querySelector("#timerResetButton"),
  autoScrollButton: document.querySelector("#autoScrollButton"),
  immersiveAutoScrollButton: document.querySelector("#immersiveAutoScrollButton"),
  scrollSpeedSlider: document.querySelector("#scrollSpeedSlider"),
  scrollSpeedText: document.querySelector("#scrollSpeedText"),
  counterButton: document.querySelector("#counterButton"),
  counterPrompt: document.querySelector(".counter-prompt"),
  counterValue: document.querySelector("#counterValue"),
  counterTargetButtons: Array.from(document.querySelectorAll("[data-counter-target]")),
  counterTargetInput: document.querySelector("#counterTargetInput"),
  counterTargetProgress: document.querySelector("#counterTargetProgress"),
  counterFeedbackButtons: Array.from(document.querySelectorAll("[data-counter-feedback]")),
  counterCompletion: document.querySelector("#counterCompletion"),
  counterCompletionText: document.querySelector("#counterCompletionText"),
  counterUndoButton: document.querySelector("#counterUndoButton"),
  counterResetButton: document.querySelector("#counterResetButton")
};

let state = loadState();
let selectedScriptureId = getInitialScriptureId();
let activeView = "reader";
let lastKsitigarbhaScriptureId = selectedScriptureId.startsWith("ksitigarbha-")
  ? selectedScriptureId
  : "ksitigarbha-01";
let isImmersiveReader = false;
let isRestoringReader = false;
let readerSaveTimeout = null;
let lastReaderScrollTop = 0;
let autoScroll = createAutoScrollState(state.scrollSpeed);
let timer = createTimerState(state.timerMinutes);
let completionAudioContext = null;
let counterAudioContext = null;
let immersiveControlsTimeout = null;
let wakeLock = null;

init();

function init() {
  bindEvents();
  registerServiceWorker();
  renderDate();
  renderScriptureTabs();
  renderReader();
  setActiveView(activeView);
}

function bindEvents() {
  els.viewButtons.forEach((button) => {
    button.addEventListener("click", () => setActiveView(button.dataset.viewTarget));
  });
  els.immersiveBar.addEventListener("click", () => setImmersiveReader(false));
  els.resumeReadingButton.addEventListener("click", resumeLastReading);
  els.chapterSelect.addEventListener("change", () => {
    selectedScriptureId = els.chapterSelect.value;
    rememberScriptureChoice(selectedScriptureId);
    renderReader();
  });
  els.prevChapterButton.addEventListener("click", () => goToAdjacentChapter(-1));
  els.nextChapterButton.addEventListener("click", () => goToAdjacentChapter(1));
  els.chapterListButton.addEventListener("click", openChapterSheet);
  els.chapterSheetClose.addEventListener("click", closeSheets);
  els.sheetBackdrop.addEventListener("click", closeSheets);
  els.pinyinToggleButton.addEventListener("click", togglePinyin);
  els.restartReadingButton.addEventListener("click", restartCurrentReading);
  els.immersiveToggleButton.addEventListener("click", () => setImmersiveReader(!isImmersiveReader));
  els.scriptureText.addEventListener("scroll", handleReaderScroll);
  els.scriptureText.addEventListener("click", handleImmersiveReaderTap);
  els.timerMinutes.addEventListener("change", updateTimerMinutes);
  els.timerToggleButton.addEventListener("click", toggleTimer);
  els.timerResetButton.addEventListener("click", resetTimer);
  els.autoScrollButton.addEventListener("click", toggleAutoScroll);
  els.immersiveAutoScrollButton.addEventListener("click", toggleAutoScroll);
  els.scrollSpeedSlider.addEventListener("input", updateScrollSpeed);
  els.counterButton.addEventListener("click", () => incrementCounter(true));
  els.counterTargetButtons.forEach((button) => {
    button.addEventListener("click", () => setCounterTarget(button.dataset.counterTarget));
  });
  els.counterFeedbackButtons.forEach((button) => {
    button.addEventListener("click", () => setCounterFeedbackMode(button.dataset.counterFeedback));
  });
  els.counterTargetInput.addEventListener("change", () => setCounterTarget(els.counterTargetInput.value));
  els.counterUndoButton.addEventListener("click", undoCounter);
  els.counterResetButton.addEventListener("click", resetCounter);
  document.addEventListener("visibilitychange", handleVisibilityChange);
  window.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (isImmersiveReader) {
      setImmersiveReader(false);
      return;
    }
    closeSheets();
  });
}

function setActiveView(view) {
  activeView = view === "counter" ? "counter" : "reader";
  const isCounterView = activeView === "counter";

  els.viewButtons.forEach((button) => {
    const isActive = button.dataset.viewTarget === activeView;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });

  els.readerPanel.hidden = isCounterView;
  els.counterPanel.hidden = !isCounterView;
  els.readerShell.classList.toggle("is-counter-view", isCounterView);
  document.body.classList.toggle("counter-view", isCounterView);
  setImmersiveReader(false);

  if (isCounterView) {
    stopAutoScroll();
  }
}

function loadState() {
  const current = readStoredState(STORAGE_KEY);
  if (current) return normalizeState(current);

  return normalizeState({
    readerPositions: {},
    lastScriptureId: null
  });
}

function normalizeState(stored) {
  return {
    readerPositions: stored?.readerPositions || {},
    lastScriptureId: stored?.lastScriptureId || null,
    timerMinutes: normalizeTimerMinutes(stored?.timerMinutes),
    pinyinVisible: stored?.pinyinVisible !== false,
    scrollSpeed: normalizeScrollSpeed(stored?.scrollSpeed),
    counterTarget: normalizeCounterTarget(stored?.counterTarget),
    counterFeedbackMode: normalizeCounterFeedbackMode(stored?.counterFeedbackMode),
    counts: stored?.counts && typeof stored.counts === "object" ? stored.counts : {}
  };
}

function readStoredState(key) {
  try {
    const stored = JSON.parse(localStorage.getItem(key));
    return stored && typeof stored === "object" ? stored : null;
  } catch (error) {
    console.warn("Failed to read local state", error);
    return null;
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function createTimerState(minutes) {
  const total = normalizeTimerMinutes(minutes) * 60;
  return {
    interval: null,
    running: false,
    total,
    remaining: total,
    endsAt: null
  };
}

function createAutoScrollState(speed) {
  return {
    frame: null,
    lastTimestamp: null,
    position: null,
    running: false,
    programmaticScroll: false,
    speed: normalizeScrollSpeed(speed)
  };
}

function getScriptures() {
  return [HEART_SUTRA, ...getDizangScriptures(), ...getExtraScriptures()];
}

function getDizangScriptures() {
  return Array.isArray(window.DIZANG_SCRIPTURES) ? window.DIZANG_SCRIPTURES : [];
}

function getExtraScriptures() {
  return Array.isArray(window.EXTRA_SCRIPTURES) ? window.EXTRA_SCRIPTURES : [];
}

function getScripture(id) {
  return getScriptures().find((scripture) => scripture.id === id) || HEART_SUTRA;
}

function findScripture(id) {
  return getScriptures().find((scripture) => scripture.id === id) || null;
}

function getScriptureGroups() {
  const dizangChildren = getDizangScriptures();
  return [
    {
      id: "heart-sutra",
      label: "心经",
      defaultScriptureId: "heart-sutra",
      children: []
    },
    {
      id: "ksitigarbha",
      label: "地藏经",
      defaultScriptureId: "ksitigarbha-01",
      children: dizangChildren
    }
  ].concat(getExtraScriptures().map((scripture) => ({
    id: scripture.id,
    label: scripture.shortTitle || scripture.title,
    defaultScriptureId: scripture.id,
    children: []
  })));
}

function getScriptureGroup(scriptureId) {
  return getScriptureGroups().find((group) => {
    if (group.defaultScriptureId === scriptureId) return true;
    return group.children.some((scripture) => scripture.id === scriptureId);
  }) || getScriptureGroups()[0];
}

function getPreferredScriptureId(group) {
  if (!group.children.length) return group.defaultScriptureId;
  const saved = group.children.find((scripture) => scripture.id === lastKsitigarbhaScriptureId);
  return saved?.id || group.defaultScriptureId;
}

function rememberScriptureChoice(scriptureId) {
  if (scriptureId?.startsWith("ksitigarbha-")) {
    lastKsitigarbhaScriptureId = scriptureId;
  }
}

function getInitialScriptureId() {
  if (state.lastScriptureId && findScripture(state.lastScriptureId)) {
    return state.lastScriptureId;
  }
  return HEART_SUTRA.id;
}

function renderDate() {
  els.todayLabel.textContent = new Intl.DateTimeFormat("zh-CN", {
    month: "long",
    day: "numeric",
    weekday: "long"
  }).format(new Date());
}

function renderScriptureTabs() {
  const groups = getScriptureGroups();

  const currentGroup = findScripture(selectedScriptureId) ? getScriptureGroup(selectedScriptureId) : null;
  if (!currentGroup || !groups.some((group) => group.id === currentGroup.id)) {
    selectedScriptureId = groups[0] ? getPreferredScriptureId(groups[0]) : HEART_SUTRA.id;
  }

  els.scriptureTabs.innerHTML = "";
  groups.forEach((group) => {
    const activeGroup = getScriptureGroup(selectedScriptureId);
    const button = document.createElement("button");
    button.className = "scripture-tab";
    button.classList.toggle("is-active", group.id === activeGroup?.id);
    button.type = "button";
    button.textContent = group.label;
    button.addEventListener("click", () => {
      selectedScriptureId = getPreferredScriptureId(group);
      rememberScriptureChoice(selectedScriptureId);
      renderScriptureTabs();
      renderReader();
    });
    els.scriptureTabs.append(button);
  });

  renderChapterPicker();
}

function renderChapterPicker() {
  const group = getScriptureGroup(selectedScriptureId);
  const hasChapters = Boolean(group?.children.length);
  els.readerShell.classList.toggle("has-chapters", hasChapters);
  els.chapterControls.hidden = !hasChapters;
  els.chapterSelect.innerHTML = "";
  els.chapterCurrentTitle.textContent = "";
  if (!hasChapters) return;

  group.children.forEach((scripture) => {
    const option = document.createElement("option");
    option.value = scripture.id;
    option.textContent = scripture.shortTitle?.replace("地藏经", "") || scripture.title;
    els.chapterSelect.append(option);
  });
  els.chapterSelect.value = selectedScriptureId;
  const currentIndex = group.children.findIndex((scripture) => scripture.id === selectedScriptureId);
  const currentScripture = group.children[currentIndex];
  els.chapterCurrentTitle.textContent = currentScripture?.shortTitle?.replace("地藏经", "") || currentScripture?.title || "";
  els.prevChapterButton.disabled = currentIndex <= 0;
  els.nextChapterButton.disabled = currentIndex < 0 || currentIndex >= group.children.length - 1;
  renderChapterList(group);
}

function goToAdjacentChapter(direction) {
  const group = getScriptureGroup(selectedScriptureId);
  if (!group?.children.length) return;

  const currentIndex = group.children.findIndex((scripture) => scripture.id === selectedScriptureId);
  const nextScripture = group.children[currentIndex + direction];
  if (!nextScripture) return;

  selectedScriptureId = nextScripture.id;
  rememberScriptureChoice(selectedScriptureId);
  renderChapterPicker();
  renderReader();
}

function renderChapterList(group) {
  els.chapterList.replaceChildren();
  els.chapterSheetSummary.textContent = "";
  if (!group?.children.length) return;

  const fragment = document.createDocumentFragment();
  group.children.forEach((scripture, index) => {
    const isActive = scripture.id === selectedScriptureId;
    const progressLabel = getStoredProgressLabel(scripture.id);
    const metaHtml = progressLabel || isActive
      ? `<div class="chapter-list-meta">${progressLabel ? `<small>${progressLabel}</small>` : ""}${isActive ? "<em>当前</em>" : ""}</div>`
      : "";
    const button = document.createElement("button");
    button.className = "chapter-list-button";
    button.classList.toggle("is-active", isActive);
    button.type = "button";
    button.innerHTML = `
      <span>${index + 1}</span>
      <strong>${getChapterLabel(scripture)}</strong>
      ${metaHtml}
    `;
    button.addEventListener("click", () => {
      selectedScriptureId = scripture.id;
      rememberScriptureChoice(selectedScriptureId);
      closeSheets();
      renderChapterPicker();
      renderReader();
    });
    fragment.append(button);
  });
  els.chapterList.append(fragment);
  const current = group.children.find((scripture) => scripture.id === selectedScriptureId);
  els.chapterSheetSummary.textContent = `共 ${group.children.length} 品 · 当前 ${getChapterLabel(current)}`;
}

function getChapterLabel(scripture) {
  return scripture.shortTitle?.replace("地藏经", "") || scripture.title;
}

function getStoredProgressRatio(scriptureId) {
  const ratio = Number(state.readerPositions?.[scriptureId]?.ratio || 0);
  return Number.isFinite(ratio) ? clamp(ratio, 0, 1) : 0;
}

function getStoredProgressLabel(scriptureId) {
  const ratio = getStoredProgressRatio(scriptureId);
  if (ratio <= 0.02) return "";
  if (ratio >= 0.98) return "已读完";
  return `读到 ${Math.round(ratio * 100)}%`;
}

function renderReader() {
  const scripture = getScripture(selectedScriptureId);
  stopAutoScroll();
  setImmersiveReader(false);
  rememberScriptureChoice(scripture.id);
  applyReadingDensity(scripture);
  els.readerTitle.textContent = scripture.title;
  renderScriptureBody(scripture);
  state.lastScriptureId = scripture.id;
  saveState();
  restoreSelectedReaderPosition();
  renderTimer();
  renderCounter();
  renderReadingProgress();
  renderResumeCard();
}

function applyReadingDensity(scripture) {
  const plainText = getScripturePlainText(scripture);
  const textLength = plainText.replace(/\s/g, "").length;
  const isLong = textLength >= 1800 || scripture.id.startsWith("ksitigarbha-") || scripture.id === "wenshu-prajna-sutra";
  const isShort = textLength <= 520 && !isLong;
  els.readerShell.classList.toggle("is-long-scripture", isLong);
  els.readerShell.classList.toggle("is-short-scripture", isShort);
}

function getScripturePlainText(scripture) {
  const generatedLines = window.SUTRA_PINYIN?.[scripture.id];
  const lines = Array.isArray(scripture.annotatedLines)
    ? scripture.annotatedLines
    : Array.isArray(generatedLines)
      ? generatedLines
      : null;
  if (lines) return lines.map((line) => line.text || "").join("");
  return scripture.text || "";
}

function renderScriptureBody(scripture) {
  const generatedLines = window.SUTRA_PINYIN?.[scripture.id];
  const lines = Array.isArray(scripture.annotatedLines)
    ? scripture.annotatedLines
    : Array.isArray(generatedLines)
      ? generatedLines
      : null;
  els.scriptureText.classList.toggle("has-annotations", Boolean(lines));
  els.scriptureText.classList.toggle("hide-pinyin", !state.pinyinVisible);
  renderPinyinToggle(Boolean(lines));

  if (!lines) {
    els.scriptureText.textContent = scripture.text;
    return;
  }

  const fragment = document.createDocumentFragment();
  lines.forEach((line) => {
    const block = document.createElement("p");
    block.className = line.note ? "chant-line" : "chant-line is-plain";

    if (line.note) {
      const note = document.createElement("span");
      note.className = "chant-note";
      note.textContent = line.note;
      block.append(note);
    }

    const body = document.createElement("span");
    body.className = "chant-body";
    body.textContent = line.text;
    block.append(body);
    fragment.append(block);
  });

  els.scriptureText.replaceChildren(fragment);
}

function renderPinyinToggle(hasAnnotations) {
  els.pinyinToggleButton.disabled = !hasAnnotations;
  els.pinyinToggleButton.textContent = state.pinyinVisible ? "隐藏拼音" : "显示拼音";
}

function restoreSelectedReaderPosition() {
  const position = state.readerPositions[selectedScriptureId];
  if (position) {
    restoreReaderPosition(position);
    return;
  }

  isRestoringReader = true;
  els.scriptureText.scrollTop = 0;
  lastReaderScrollTop = 0;
  window.setTimeout(() => {
    isRestoringReader = false;
  }, 0);
}

function restoreReaderPosition(position) {
  const ratio = clamp(position.ratio || 0, 0, 1);
  isRestoringReader = true;
  window.setTimeout(() => {
    els.scriptureText.scrollTop = getReaderMaxScroll() * ratio;
    lastReaderScrollTop = els.scriptureText.scrollTop;
    isRestoringReader = false;
    renderReadingProgress();
    showReaderRestoreToast(ratio);
  }, 0);
}

function resumeLastReading() {
  const resumeId = getResumeScriptureId();
  if (!resumeId) return;
  selectedScriptureId = resumeId;
  rememberScriptureChoice(selectedScriptureId);
  renderScriptureTabs();
  renderReader();
}

function renderResumeCard() {
  const resumeId = getResumeScriptureId();
  if (!resumeId) {
    els.resumeReadingButton.hidden = true;
    return;
  }

  const ratio = getStoredProgressRatio(resumeId);
  if (ratio <= 0.02) {
    els.resumeReadingButton.hidden = true;
    return;
  }

  const scripture = getScripture(resumeId);
  els.resumeReadingTitle.textContent = getResumeScriptureLabel(scripture);
  els.resumeReadingProgress.textContent = ratio >= 0.98 ? "已读完" : `读至 ${Math.round(ratio * 100)}%`;
  els.resumeReadingButton.hidden = false;
}

function getResumeScriptureId() {
  const entries = Object.entries(state.readerPositions || {})
    .filter(([scriptureId, position]) => findScripture(scriptureId) && Number(position?.ratio || 0) > 0.02)
    .sort(([, a], [, b]) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0));
  const lastRatio = state.lastScriptureId ? getStoredProgressRatio(state.lastScriptureId) : 0;
  if (state.lastScriptureId && findScripture(state.lastScriptureId) && lastRatio > 0.02) return state.lastScriptureId;
  return entries[0]?.[0] || "";
}

function getResumeScriptureLabel(scripture) {
  const group = getScriptureGroup(scripture.id);
  if (group?.children.length) return `${group.label} · ${getChapterLabel(scripture)}`;
  return scripture.shortTitle || scripture.title;
}

function handleReaderScroll() {
  if (isRestoringReader) return;
  if (autoScroll.programmaticScroll) {
    renderReadingProgress();
    return;
  }
  if (autoScroll.running) {
    stopAutoScroll();
  }
  updateImmersiveMode();
  window.clearTimeout(readerSaveTimeout);
  readerSaveTimeout = window.setTimeout(saveReaderPosition, 220);
}

function updateImmersiveMode() {
  if (activeView !== "reader" || window.innerWidth > 760) return;
  const currentTop = els.scriptureText.scrollTop;
  const movingDown = currentTop > lastReaderScrollTop + 8;
  const movingUp = currentTop < lastReaderScrollTop - 12;

  if (movingDown && currentTop > 88) {
    setImmersiveReader(true);
  } else if (movingUp || currentTop < 24) {
    setImmersiveReader(false);
  }

  lastReaderScrollTop = currentTop;
}

function setImmersiveReader(active) {
  isImmersiveReader = Boolean(active && activeView === "reader");
  document.body.classList.toggle("immersive-reader", isImmersiveReader);
  document.body.classList.toggle("immersive-controls-visible", isImmersiveReader);
  els.immersiveBar.hidden = !isImmersiveReader;
  els.immersiveBar.textContent = "退出";
  els.immersiveToggleButton.textContent = isImmersiveReader ? "退出沉浸" : "沉浸";
  els.immersiveToggleButton.setAttribute("aria-pressed", String(isImmersiveReader));
  window.clearTimeout(immersiveControlsTimeout);
  if (isImmersiveReader) {
    scheduleImmersiveControlsHide();
  }
}

function handleImmersiveReaderTap(event) {
  if (!isImmersiveReader || event.target.closest("button")) return;
  showImmersiveControls();
}

function showImmersiveControls() {
  if (!isImmersiveReader) return;
  document.body.classList.add("immersive-controls-visible");
  scheduleImmersiveControlsHide();
}

function scheduleImmersiveControlsHide() {
  window.clearTimeout(immersiveControlsTimeout);
  immersiveControlsTimeout = window.setTimeout(() => {
    if (isImmersiveReader) {
      document.body.classList.remove("immersive-controls-visible");
    }
  }, 2600);
}

function saveReaderPosition() {
  state.readerPositions[selectedScriptureId] = {
    ratio: getReaderProgressRatio(),
    updatedAt: new Date().toISOString()
  };
  state.lastScriptureId = selectedScriptureId;
  saveState();
  renderReadingProgress();
  renderResumeCard();
}

function restartCurrentReading() {
  stopAutoScroll();
  isRestoringReader = true;
  els.scriptureText.scrollTo({ top: 0, behavior: "smooth" });
  state.readerPositions[selectedScriptureId] = {
    ratio: 0,
    updatedAt: new Date().toISOString()
  };
  state.lastScriptureId = selectedScriptureId;
  saveState();
  window.setTimeout(() => {
    isRestoringReader = false;
    renderReadingProgress();
    renderResumeCard();
  }, 260);
}

function renderReadingProgress() {
  const ratio = getReaderProgressRatio();
  if (ratio <= 0.02 || getReaderMaxScroll() <= 0) {
    els.readerProgressText.textContent = "";
    return;
  }
  els.readerProgressText.textContent = `读至 ${Math.round(ratio * 100)}%`;
}

function showReaderRestoreToast(ratio) {
  els.readerRestoreToast.hidden = true;
  els.readerRestoreToast.textContent = "";
}

function togglePinyin() {
  const ratio = getReaderProgressRatio();
  state.pinyinVisible = !state.pinyinVisible;
  saveState();
  els.scriptureText.classList.toggle("hide-pinyin", !state.pinyinVisible);
  renderPinyinToggle(els.scriptureText.classList.contains("has-annotations"));
  restoreReaderPosition({ ratio });
}

function updateTimerMinutes() {
  const minutes = normalizeTimerMinutes(els.timerMinutes.value);
  state.timerMinutes = minutes;
  saveState();
  els.timerMinutes.value = String(minutes);
  stopTimer();
  timer = createTimerState(minutes);
  renderTimer();
}

function toggleTimer() {
  if (timer.running) {
    stopTimer();
    renderTimer();
    return;
  }

  if (timer.remaining <= 0) {
    timer = createTimerState(state.timerMinutes);
  }

  primeCompletionCue();
  timer.running = true;
  timer.endsAt = Date.now() + timer.remaining * 1000;
  timer.interval = window.setInterval(tickTimer, 250);
  renderTimer();
}

function tickTimer() {
  timer.remaining = Math.max(0, Math.ceil((timer.endsAt - Date.now()) / 1000));
  if (timer.remaining <= 0) {
    stopTimer();
    playCompletionCue();
  }
  renderTimer();
}

function resetTimer() {
  stopTimer();
  timer = createTimerState(state.timerMinutes);
  renderTimer();
}

function stopTimer() {
  window.clearInterval(timer.interval);
  timer.interval = null;
  timer.running = false;
  timer.endsAt = null;
}

function renderTimer() {
  const ratio = timer.total > 0 ? 1 - timer.remaining / timer.total : 0;
  const progress = `${Math.round(clamp(ratio, 0, 1) * 100)}%`;
  const timeText = formatDuration(timer.remaining);
  const stateText = getTimerStateText();
  const isComplete = isTimerComplete();
  els.timerMinutes.value = String(state.timerMinutes);
  els.timerTime.textContent = timeText;
  els.timerToggleButton.textContent = timer.running ? "暂停" : "开始";
  els.timerState.textContent = stateText;
  els.timerProgress.style.width = progress;
  els.timerCompletionMessage.hidden = !isComplete;
  els.timerCompletionMessage.textContent = isComplete ? "本轮圆满" : "";
  els.immersiveTimerTime.textContent = timeText;
  els.immersiveTimerState.textContent = stateText;
  els.immersiveTimerProgress.style.width = progress;
}

function updateScrollSpeed() {
  autoScroll.speed = normalizeScrollSpeed(els.scrollSpeedSlider.value);
  state.scrollSpeed = autoScroll.speed;
  saveState();
  renderAutoScroll();
}

function toggleAutoScroll() {
  if (autoScroll.running) {
    stopAutoScroll();
    return;
  }
  startAutoScroll();
}

function startAutoScroll() {
  if (getReaderMaxScroll() <= 0) return;
  if (window.innerWidth <= 760) {
    setImmersiveReader(true);
  }
  autoScroll.running = true;
  autoScroll.lastTimestamp = null;
  autoScroll.position = els.scriptureText.scrollTop;
  requestScreenWakeLock();
  renderAutoScroll();
  autoScroll.frame = window.requestAnimationFrame(stepAutoScroll);
}

function stepAutoScroll(timestamp) {
  if (!autoScroll.running) return;
  if (autoScroll.lastTimestamp == null) {
    autoScroll.lastTimestamp = timestamp;
  }
  const elapsed = Math.min(0.08, (timestamp - autoScroll.lastTimestamp) / 1000);
  autoScroll.lastTimestamp = timestamp;
  const maxScroll = getReaderMaxScroll();
  autoScroll.position = Math.min(maxScroll, autoScroll.position + autoScroll.speed * elapsed);
  autoScroll.programmaticScroll = true;
  els.scriptureText.scrollTop = autoScroll.position;
  window.requestAnimationFrame(() => {
    autoScroll.programmaticScroll = false;
  });

  if (els.scriptureText.scrollTop >= maxScroll) {
    saveReaderPosition();
    stopAutoScroll();
    return;
  }
  autoScroll.frame = window.requestAnimationFrame(stepAutoScroll);
}

function stopAutoScroll() {
  window.cancelAnimationFrame(autoScroll.frame);
  autoScroll.frame = null;
  autoScroll.lastTimestamp = null;
  autoScroll.position = null;
  autoScroll.running = false;
  autoScroll.programmaticScroll = false;
  releaseScreenWakeLock();
  renderAutoScroll();
}

function renderAutoScroll() {
  const speedPercent = ((autoScroll.speed - MIN_SCROLL_SPEED) / (MAX_SCROLL_SPEED - MIN_SCROLL_SPEED)) * 100;
  els.scrollSpeedSlider.value = String(autoScroll.speed);
  els.scrollSpeedSlider.style.setProperty("--speed-percent", `${clamp(speedPercent, 0, 100)}%`);
  els.scrollSpeedText.textContent = getScrollSpeedLabel(autoScroll.speed);
  els.autoScrollButton.textContent = autoScroll.running ? "停止滚动" : "自动滚动";
  els.immersiveAutoScrollButton.textContent = autoScroll.running ? "停止滚动" : "自动滚动";
  els.autoScrollButton.classList.toggle("is-active", autoScroll.running);
  els.immersiveAutoScrollButton.classList.toggle("is-active", autoScroll.running);
  els.immersiveAutoScrollButton.setAttribute("aria-pressed", String(autoScroll.running));
}

function incrementCounter(showFlash) {
  const previousCount = getCurrentCounterValue();
  const count = previousCount + 1;
  const target = getCounterTarget();
  const reachedTarget = previousCount < target && count >= target;
  setCurrentCounterValue(count);
  renderCounter();
  if (showFlash) {
    playCounterStrike(reachedTarget);
    showCountFlash(reachedTarget ? "圆满达成" : "功德 +1");
  }
}

function resetCounter() {
  setCurrentCounterValue(0);
  renderCounter();
}

function undoCounter() {
  const count = getCurrentCounterValue();
  if (count <= 0) return;
  setCurrentCounterValue(count - 1);
  renderCounter();
  showCountFlash("撤回一次");
}

function getCurrentCounterValue() {
  const count = Number(state.counts?.standaloneCounter || 0);
  return Number.isFinite(count) ? Math.max(0, Math.round(count)) : 0;
}

function setCurrentCounterValue(count) {
  state.counts.standaloneCounter = Math.max(0, Math.round(count));
  saveState();
}

function setCounterTarget(value) {
  state.counterTarget = normalizeCounterTarget(value);
  saveState();
  renderCounter();
}

function setCounterFeedbackMode(value) {
  state.counterFeedbackMode = normalizeCounterFeedbackMode(value);
  saveState();
  renderCounterFeedback();
}

function getCounterTarget() {
  return normalizeCounterTarget(state.counterTarget);
}

function renderCounter() {
  const count = getCurrentCounterValue();
  const target = getCounterTarget();
  const isComplete = count >= target;
  els.counterValue.textContent = String(count);
  els.counterPrompt.textContent = isComplete ? "今日圆满" : "轻敲木鱼";
  els.counterTargetInput.value = String(target);
  els.counterTargetProgress.textContent = `${count}/${target}`;
  els.counterTargetButtons.forEach((button) => {
    button.classList.toggle("is-active", normalizeCounterTarget(button.dataset.counterTarget) === target);
  });
  renderCounterFeedback();
  els.counterPanel.classList.toggle("is-complete", isComplete);
  els.counterButton.classList.toggle("is-target-met", isComplete);
  els.counterCompletion.hidden = !isComplete;
  els.counterCompletionText.textContent = isComplete ? "圆满完成" : "";
  els.counterUndoButton.disabled = count <= 0;
}

function showCountFlash(message) {
  els.countFlash.textContent = message;
  els.countFlash.classList.toggle("is-complete-flash", message.includes("圆满"));
  els.countFlash.classList.remove("is-visible");
  window.requestAnimationFrame(() => {
    els.countFlash.classList.add("is-visible");
    window.setTimeout(() => els.countFlash.classList.remove("is-visible"), 520);
  });
}

function playCounterStrike(strong) {
  const feedbackMode = normalizeCounterFeedbackMode(state.counterFeedbackMode);
  if (feedbackMode !== "silent" && "vibrate" in navigator) {
    navigator.vibrate(strong ? [35, 35, 35] : 18);
  }
  if (feedbackMode === "sound") {
    playMuyuCue(strong);
  }
  els.counterButton.classList.remove("is-struck");
  void els.counterButton.offsetWidth;
  els.counterButton.classList.add("is-struck");
  window.setTimeout(() => els.counterButton.classList.remove("is-struck"), 520);
}

function renderCounterFeedback() {
  const mode = normalizeCounterFeedbackMode(state.counterFeedbackMode);
  els.counterFeedbackButtons.forEach((button) => {
    const isActive = button.dataset.counterFeedback === mode;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function playMuyuCue(strong) {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;
  const context = counterAudioContext || new AudioContextClass();
  counterAudioContext = context;
  context.resume?.().catch(() => {});

  const now = context.currentTime;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const filter = context.createBiquadFilter();

  oscillator.type = "triangle";
  oscillator.frequency.setValueAtTime(strong ? 150 : 185, now);
  oscillator.frequency.exponentialRampToValueAtTime(strong ? 92 : 120, now + 0.14);
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(strong ? 580 : 720, now);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(strong ? 0.11 : 0.075, now + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + (strong ? 0.28 : 0.18));

  oscillator.connect(filter).connect(gain).connect(context.destination);
  oscillator.start(now);
  oscillator.stop(now + (strong ? 0.3 : 0.2));
}

async function requestScreenWakeLock() {
  if (!("wakeLock" in navigator) || wakeLock) return;
  try {
    wakeLock = await navigator.wakeLock.request("screen");
    wakeLock.addEventListener(
      "release",
      () => {
        wakeLock = null;
      },
      { once: true }
    );
  } catch (error) {
    wakeLock = null;
  }
}

function releaseScreenWakeLock() {
  if (!wakeLock) return;
  wakeLock.release?.().catch(() => {});
  wakeLock = null;
}

function handleVisibilityChange() {
  if (document.visibilityState === "visible" && autoScroll.running) {
    requestScreenWakeLock();
    return;
  }
  releaseScreenWakeLock();
}

function primeCompletionCue() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;
  completionAudioContext = completionAudioContext || new AudioContextClass();
  completionAudioContext.resume?.().catch(() => {});
}

function playCompletionCue() {
  if ("vibrate" in navigator) {
    navigator.vibrate([70, 45, 70]);
  }

  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;
  const context = completionAudioContext || new AudioContextClass();
  completionAudioContext = context;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = "sine";
  oscillator.frequency.value = 528;
  gain.gain.setValueAtTime(0.0001, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.055, context.currentTime + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.95);
  oscillator.connect(gain).connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + 0.98);
}

function openChapterSheet() {
  const group = getScriptureGroup(selectedScriptureId);
  renderChapterList(group);
  openSheet(els.chapterSheet);
  window.requestAnimationFrame(() => {
    els.chapterList.querySelector(".chapter-list-button.is-active")?.scrollIntoView({ block: "center" });
  });
}

function openSheet(sheet) {
  els.sheetBackdrop.hidden = false;
  sheet.hidden = false;
}

function closeSheets() {
  els.sheetBackdrop.hidden = true;
  els.chapterSheet.hidden = true;
}

function getTimerStateText() {
  if (timer.running) return "进行中";
  if (isTimerComplete()) return "本轮圆满";
  return timer.remaining === timer.total ? "未开始" : "已暂停";
}

function isTimerComplete() {
  return timer.total > 0 && timer.remaining <= 0;
}

function getReaderMaxScroll() {
  return Math.max(0, els.scriptureText.scrollHeight - els.scriptureText.clientHeight);
}

function getReaderProgressRatio() {
  const maxScroll = getReaderMaxScroll();
  return maxScroll > 0 ? clamp(els.scriptureText.scrollTop / maxScroll, 0, 1) : 1;
}

function formatDuration(totalSeconds) {
  const seconds = Math.max(0, Math.round(totalSeconds || 0));
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
}

function normalizeTimerMinutes(value) {
  const minutes = Number(value);
  if (!Number.isFinite(minutes)) return 5;
  return Math.min(180, Math.max(1, Math.round(minutes)));
}

function normalizeScrollSpeed(value) {
  if (Object.prototype.hasOwnProperty.call(SCROLL_SPEED_PRESETS, value)) {
    return SCROLL_SPEED_PRESETS[value];
  }
  const speed = Number(value);
  if (!Number.isFinite(speed)) return DEFAULT_SCROLL_SPEED;
  return clamp(Math.round(speed), MIN_SCROLL_SPEED, MAX_SCROLL_SPEED);
}

function getScrollSpeedLabel(speed) {
  if (speed < 22) return "很慢";
  if (speed < 34) return "慢";
  if (speed < 48) return "中";
  if (speed < 66) return "快";
  return "很快";
}

function normalizeCounterTarget(value) {
  const target = Number(value);
  if (!Number.isFinite(target)) return DEFAULT_COUNTER_TARGET;
  return Math.min(99999, Math.max(1, Math.round(target)));
}

function normalizeCounterFeedbackMode(value) {
  return COUNTER_FEEDBACK_MODES.includes(value) ? value : DEFAULT_COUNTER_FEEDBACK_MODE;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./service-worker.js")
      .then((registration) => registration.update())
      .catch((error) => {
        console.warn("Service worker registration failed", error);
      });
  });
}
