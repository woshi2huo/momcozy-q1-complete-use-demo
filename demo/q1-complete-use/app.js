const VERSION = "0.6.42";
const STORAGE_KEY = `momcozy-q1-complete-use-v${VERSION}`;
const DEVICE_VIEWPORT = Object.freeze({ width: 402, height: 874 });
const QUICK_DELAY = Object.freeze({
  autoDiscovery: 400,
  autoConnect: 350,
  manualScan: 500,
  sessionLogged: 800,
  toast: 900
});

// Source dimensions are retained for reference; every screen renders in DEVICE_VIEWPORT.
const screenGroups = [
  {
    label: "设备连接",
    icon: "wifi",
    screens: [
      { id: "pairing-home", label: "未绑定设备首页", caption: "自动发现或手动添加 Q1", image: "pairing-home.png", width: 393, height: 852 },
      { id: "auto-discovery", label: "自动发现 Q1", caption: "新设备发现弹层", image: "auto-discovery-iphone17.png", width: 393, height: 852 },
      { id: "auto-connecting", label: "自动连接中", caption: "Q1 自动连接状态", image: "auto-connecting-iphone17.png", width: 393, height: 852 },
      { id: "auto-complete", label: "自动发现完成", caption: "完成后进入 Q1 子首页", image: "auto-complete-iphone17.png", width: 393, height: 852 },
      { id: "manual-add", label: "手动添加设备", caption: "从设备列表选择 Q1", image: "manual-add-iphone17.png", width: 375, height: 812 },
      { id: "manual-scan", label: "扫描设备", caption: "搜索附近 Q1", image: "manual-scan.png", width: 375, height: 812 },
      { id: "manual-confirm", label: "连接确认", caption: "确认连接 Q1", image: "manual-confirm.png", width: 375, height: 812 },
      { id: "manual-progress", label: "连接中", caption: "手机与 Q1 建立连接", image: "manual-progress.png", width: 375, height: 812 },
      { id: "manual-complete", label: "连接完成", caption: "完成后进入设备控制", image: "manual-complete.png", width: 375, height: 812 }
    ]
  },
  {
    label: "设备教学",
    icon: "book-open",
    screens: [
      { id: "training-welcome", label: "设备教学欢迎页", caption: "Welcome to Q1 与教学概览", image: "training-welcome.png", width: 393, height: 852 },
      { id: "training-guide", label: "设备教学详情页", caption: "Step 1 · Disassemble Parts", image: "training-guide.png", width: 393, height: 852 },
      { id: "training-guide-final", label: "设备教学最后一页", caption: "Step 2 · Finish Setup", image: "training-guide-final.png", width: 393, height: 852 },
      { id: "training-ready", label: "设备教学完成页", caption: "You're all set 与帮助入口", image: "training-ready.png", width: 393, height: 852 }
    ]
  },
  {
    label: "吸乳数据与计划",
    icon: "bar-chart-3",
    screens: [
      { id: "lactation-empty", label: "初始子首页", caption: "无吸乳数据与泌乳计划", image: "subhome-empty.png", width: 402, height: 874 },
      { id: "pumping-trend", label: "吸乳趋势详情", caption: "查看周期趋势与吸乳记录", width: 402, height: 874 },
      { id: "pumping-log", label: "记录吸乳量", caption: "记录左右侧奶量", image: "subhome-empty.png", width: 402, height: 874 },
      { id: "pumping-logged", label: "记录完成", caption: "吸乳记录保存成功", image: "pumping-logged.png", width: 393, height: 852 },
      { id: "lactation-recorded", label: "已记录子首页", caption: "已有吸乳记录，尚未创建计划", image: "subhome-recorded.png", width: 402, height: 874 },
      { id: "plan-intro", label: "AI 泌乳计划介绍", caption: "了解个性化泌乳计划", image: "plan-intro.png", width: 402, height: 874 },
      { id: "plan-form", label: "基础信息", caption: "填写计划生成信息", image: "plan-form.png", width: 402, height: 874 },
      { id: "plan-loading", label: "计划生成中", caption: "AI 正在生成泌乳计划", image: "plan-loading.png", width: 402, height: 874 },
      { id: "plan-schedule", label: "计划时段", caption: "确认每日吸乳时段", image: "plan-schedule.png", width: 402, height: 874 },
      { id: "home", label: "已有计划子首页", caption: "吸乳记录、计划与设备卡片", image: "subhome-plan-empty.png", width: 402, height: 874 }
    ]
  },
  {
    label: "核心使用",
    icon: "activity",
    screens: [
      { id: "control", label: "设备控制", caption: "Q1 参数与启动控制", image: "device-control.png", width: 375, height: 956, canvasHeight: 1025 },
      { id: "pumping-active", label: "吸乳中", caption: "计时、暂停与完成本次吸乳", image: "device-control.png", width: 375, height: 956, canvasHeight: 1025 },
      { id: "pumping-finish-log", label: "完成吸乳", caption: "补充本次左右侧吸乳量", image: "device-control.png", width: 375, height: 956, canvasHeight: 1025 },
      { id: "pumping-session-logged", label: "吸乳完成记录", caption: "本次吸乳数据已更新", image: "pumping-logged.png", width: 393, height: 852 }
    ]
  },
  {
    label: "韵律与 Program",
    icon: "audio-waveform",
    screens: [
      { id: "mode-list", label: "韵律列表", caption: "Manual 与 Programs", image: "rhythm-list.png", width: 402, height: 1046, canvasHeight: 1046 },
      { id: "program-new", label: "新增 Program", caption: "命名与描述", image: "new-program.png", width: 375, height: 812 },
      { id: "program-detail", label: "韵律详情", caption: "Program 分段与新增入口", image: "program-detail.png", width: 375, height: 812 },
      { id: "program-section-create", label: "创建韵律", caption: "模式、档位、频率与使用时间", image: "program-section-create.jpg", width: 375, height: 1056, canvasHeight: 1132 },
      { id: "program-section-rest", label: "休息韵律", caption: "Rest 与使用时间", image: "program-section-rest.jpg", width: 375, height: 1056, canvasHeight: 1132 },
      { id: "program-detail-section", label: "韵律详情（已更新）", caption: "已保存的 Program 分段", image: "program-detail-section.jpg", width: 375, height: 812 },
      { id: "program-detail-actions", label: "韵律分段操作", caption: "复制与删除操作", image: "program-detail-actions.jpg", width: 375, height: 812 },
      { id: "program-mode-selection", label: "Mode Selection", caption: "保存后选择 Program", image: "program-mode-selection.png", width: 375, height: 815 }
    ]
  },
  {
    label: "设备维护",
    icon: "settings-2",
    screens: [
      { id: "settings", label: "设置页", caption: "Q1 设备设置", image: "settings.png", width: 402, height: 874 },
      { id: "firmware-alert", label: "固件升级确认", caption: "升级前确认", image: "firmware-alert.png", width: 402, height: 874 },
      { id: "firmware-upgrade", label: "MCU 升级过程", caption: "固件升级进度", image: "firmware-upgrade.png", width: 375, height: 812 }
    ]
  }
];

const screens = screenGroups.flatMap((group) => group.screens);
const screenById = new Map(screens.map((screen) => [screen.id, screen]));
const screenScrollPositions = new Map();
const PROGRAM_SECTION_MODES = ["Massage", "Breastfeeding", "Mixing", "Lactation", "Rest"];
const MAX_PROGRAM_SECTIONS = 10;
const fallbackBackTargets = {
  "auto-discovery": "pairing-home",
  "auto-connecting": "auto-discovery",
  "auto-complete": "pairing-home",
  "manual-add": "pairing-home",
  "manual-scan": "manual-add",
  "manual-confirm": "manual-scan",
  "manual-progress": "manual-confirm",
  "manual-complete": "manual-confirm",
  "training-welcome": "pairing-home",
  "training-guide": "training-welcome",
  "training-guide-final": "training-guide",
  "training-ready": "training-guide-final",
  "lactation-empty": "pairing-home",
  "pumping-trend": "lactation-empty",
  "pumping-log": "lactation-empty",
  "pumping-logged": "pumping-log",
  "lactation-recorded": "lactation-empty",
  "plan-intro": "lactation-recorded",
  "plan-form": "plan-intro",
  "plan-loading": "plan-form",
  "plan-schedule": "plan-form",
  home: "lactation-recorded",
  control: "home",
  "pumping-active": "control",
  "pumping-finish-log": "pumping-active",
  "pumping-session-logged": "pumping-finish-log",
  "mode-list": "control",
  "program-new": "mode-list",
  "program-detail": "mode-list",
  "program-section-create": "program-detail",
  "program-section-rest": "program-section-create",
  "program-detail-section": "program-detail",
  "program-detail-actions": "program-detail-section",
  "program-mode-selection": "program-detail-section",
  settings: "control",
  "firmware-alert": "settings",
  "firmware-upgrade": "settings"
};

const savedState = loadSavedState();
const initialHash = window.location.hash.slice(1);
const state = {
  currentId: screenById.has(initialHash) ? initialHash : "pairing-home",
  bound: savedState.bound === true,
  autoDiscoveryQueued: initialHash === "",
  pairingProgress: 33,
  modeName: savedState.modeName || "Stimulation",
  level: clamp(Number(savedState.level) || 1, 1, 12),
  frequency: clamp(Number(savedState.frequency) || 1, 1, 5),
  lightOn: savedState.lightOn !== false,
  lightMode: ["Glow", "Soft", "Clear"].includes(savedState.lightMode) ? savedState.lightMode : "Clear",
  programName: savedState.programName || "Personal-01 wait a minute wait a mi",
  programDescription: savedState.programDescription || "Enhancess breastfeeding by boosting milk supply, ideal for moms looking to increase...",
  programDraft: "",
  descriptionDraft: "",
  programEditingExisting: false,
  programSections: normalizeProgramSections(savedState.programSections, savedState.sectionCount),
  sectionDraft: createProgramSection({ frequency: 5, duration: 5 }),
  progress: 27,
  milkLeft: clamp(Number.isFinite(Number(savedState.milkLeft)) ? Number(savedState.milkLeft) : 210, 0, 300),
  milkRight: clamp(Number.isFinite(Number(savedState.milkRight)) ? Number(savedState.milkRight) : 210, 0, 300),
  pumpingDuration: clamp(Number(savedState.pumpingDuration) || 20, 5, 60),
  pumpingLogged: savedState.pumpingLogged === true,
  trendRange: ["Day", "Week", "Month", "Year"].includes(savedState.trendRange) ? savedState.trendRange : "Week",
  planCreated: savedState.planCreated === true,
  planAgeMonths: clamp(Number(savedState.planAgeMonths) || 1, 0, 36),
  feedingMethod: savedState.feedingMethod || "Breastfeeding",
  planGoal: savedState.planGoal || "Power Pumping",
  planTimes: Array.isArray(savedState.planTimes) && savedState.planTimes.length
    ? savedState.planTimes
    : [
        { time: "07:00", end: "07:30", active: true },
        { time: "10:00", end: "10:30", active: true },
        { time: "18:00", end: "18:30", active: true },
        { time: "22:00", end: "22:30", active: true }
      ],
  planProgress: 12,
  pumpingSeconds: 810,
  pumpingPaused: false,
  sessionLoggedAutoAdvance: false,
  pendingProgramRun: "",
  pendingModeSelection: "",
  activeProgramName: "",
  modeListReturnId: "",
  guideVideoPlaying: false
};

const screenHistory = [];
let toastTimer = null;
let upgradeTimer = null;
let pairingTimer = null;
let pairingProgressTimer = null;
let planTimer = null;
let pumpingTimer = null;
let sessionLoggedTimer = null;
let trainingFullscreen = false;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function createProgramSection(overrides = {}) {
  return {
    mode: PROGRAM_SECTION_MODES.includes(overrides.mode) ? overrides.mode : "Massage",
    level: clamp(Number(overrides.level) || 1, 1, 12),
    frequency: clamp(Number(overrides.frequency) || 1, 1, 5),
    duration: clamp(Number(overrides.duration) || 10, 5, 30)
  };
}

function normalizeProgramSections(sections, fallbackCount = 1) {
  if (Array.isArray(sections) && sections.length) {
    return sections.slice(0, MAX_PROGRAM_SECTIONS).map((section) => createProgramSection(section));
  }
  const count = clamp(Number(fallbackCount) || 1, 1, MAX_PROGRAM_SECTIONS);
  return Array.from({ length: count }, (_, index) => createProgramSection({
    mode: index === 0 ? "Massage" : PROGRAM_SECTION_MODES[index % PROGRAM_SECTION_MODES.length],
    duration: index === 0 ? 11 : 10
  }));
}

function formatPumpingTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}m ${String(seconds).padStart(2, "0")}s`;
}

function getPumpingSessionStatus() {
  if (state.currentId === "pumping-active") return state.pumpingPaused ? "Paused" : formatPumpingTime(state.pumpingSeconds);
  if (state.currentId === "pumping-finish-log") return "Finishing";
  if (state.currentId === "pumping-session-logged") return "Logged";
  return "Idle";
}

function isPumpingSessionRunning() {
  return state.currentId === "pumping-active"
    || (state.currentId === "mode-list" && state.modeListReturnId === "pumping-active");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function loadSavedState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function persistState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    modeName: state.modeName,
    level: state.level,
    frequency: state.frequency,
    lightOn: state.lightOn,
    lightMode: state.lightMode,
    bound: state.bound,
    programName: state.programName,
    programDescription: state.programDescription,
    sectionCount: state.programSections.length,
    programSections: state.programSections,
    milkLeft: state.milkLeft,
    milkRight: state.milkRight,
    pumpingDuration: state.pumpingDuration,
    pumpingLogged: state.pumpingLogged,
    trendRange: state.trendRange,
    planCreated: state.planCreated,
    planAgeMonths: state.planAgeMonths,
    feedingMethod: state.feedingMethod,
    planGoal: state.planGoal,
    planTimes: state.planTimes
  }));
}

function icon(name) {
  return `<i data-lucide="${name}" aria-hidden="true"></i>`;
}

function hotspot(action, label, left, top, width, height, attributes = "") {
  return `<button type="button" class="hotspot" data-action="${action}" aria-label="${label}" style="left:${left}%;top:${top}%;width:${width}%;height:${height}%" ${attributes}></button>`;
}

function figmaHotspot(action, label, left, top, width, height, attributes = "") {
  return `<button type="button" class="hotspot figma-hotspot" data-action="${action}" aria-label="${label}" style="left:${left}%;top:${top}%;width:${width}%;height:${height}%" ${attributes}></button>`;
}

function renderSidebar() {
  let screenNumber = 0;
  const groups = screenGroups.map((group) => {
    const items = group.screens.map((screen) => {
      screenNumber += 1;
      const current = screen.id === state.currentId ? 'aria-current="page"' : "";
      return `<li><button type="button" data-action="jump" data-screen="${screen.id}" ${current}>
        <span class="screen-number">${String(screenNumber).padStart(2, "0")}</span>
        <span class="screen-name">${screen.label}</span>
      </button></li>`;
    }).join("");

    return `<section class="nav-group">
      <h2>${icon(group.icon)}<span>${group.label}</span></h2>
      <ol class="screen-nav">${items}</ol>
    </section>`;
  }).join("");

  return `<aside class="sidebar" aria-label="Demo 目录">
    <div class="sidebar-brand">
      <span class="eyebrow">MOMCOZY Q1</span>
      <h1>Demo 目录</h1>
      <section class="pairing-entry-card" aria-label="设备连接流程入口">
        <button type="button" class="pairing-entry-main" data-action="restart-pairing">
          ${icon("wifi")}
          <span><strong>设备连接流程</strong><small>从未绑定首页开始</small></span>
          ${icon("chevron-right")}
        </button>
        <div class="pairing-entry-actions">
          <button type="button" data-action="restart-auto-pairing">${icon("radio")}<span>自动发现</span></button>
          <button type="button" data-action="restart-manual-pairing">${icon("search")}<span>手动添加</span></button>
        </div>
      </section>
    </div>
    <div class="sidebar-scroll">${groups}</div>
    <footer class="sidebar-footer">
      <span>v${VERSION}</span>
      <button type="button" class="text-button" data-action="reset">${icon("rotate-ccw")}<span>重置当前流程</span></button>
    </footer>
  </aside>`;
}

function renderTopbar(screen) {
  const index = screens.findIndex((item) => item.id === screen.id);
  const options = screens.map((item) => `<option value="${item.id}" ${item.id === screen.id ? "selected" : ""}>${item.label}</option>`).join("");

  return `<header class="topbar">
    <div class="topbar-title">
      <strong>Q1 完整使用 Demo</strong>
      <span>${index + 1}/${screens.length} · ${screen.label} · ${screen.caption}</span>
    </div>
    <select class="mobile-picker" aria-label="选择 Demo 页面">${options}</select>
    <div class="topbar-status"><span class="status-dot"></span><span>Q1 V1.2 · iPhone 17 · ${DEVICE_VIEWPORT.width} × ${DEVICE_VIEWPORT.height}</span></div>
    <div class="topbar-actions">
      <button type="button" class="icon-button" data-action="previous" aria-label="上一页" title="上一页" ${index === 0 ? "disabled" : ""}>${icon("arrow-left")}</button>
      <button type="button" class="icon-button" data-action="next" aria-label="下一页" title="下一页" ${index === screens.length - 1 ? "disabled" : ""}>${icon("arrow-right")}</button>
      <button type="button" class="icon-button" data-action="reset" aria-label="重置流程" title="重置流程">${icon("rotate-ccw")}</button>
    </div>
  </header>`;
}

function baseImage(screen) {
  return `<img class="phone-image" src="./assets/hd/${screen.image}?v=${VERSION}" width="${DEVICE_VIEWPORT.width}" height="${screen.canvasHeight || DEVICE_VIEWPORT.height}" alt="${screen.label}" draggable="false" />`;
}

function renderPairingHome(screen) {
  return `${baseImage(screen)}
    <button type="button" class="pairing-add-device-button" data-action="open-manual-pairing">Add Device</button>
    ${hotspot("start-auto-discovery", "模拟自动发现 Q1", 70, 8, 24, 14)}`;
}

function renderAutoDiscovery(screen) {
  return `${baseImage(screen)}
    <span class="pairing-add-device-button dimmed">Add Device</span>
    ${hotspot("back", "关闭自动发现弹层", 80, 47, 14, 8)}
    ${hotspot("auto-connect", "Connect Q1", 6, 78, 88, 7.5)}`;
}

function renderAutoConnecting(screen) {
  return `${baseImage(screen)}
    <div class="auto-connecting-button"><span class="pairing-spinner"></span><strong>Connecting</strong></div>
    ${hotspot("back", "取消自动连接", 81, 49, 13, 8)}`;
}

function renderAutoComplete(screen) {
  return `${baseImage(screen)}
    <button type="button" class="auto-complete-close" data-action="back" aria-label="关闭连接完成弹层">${icon("x")}</button>
    <button type="button" class="auto-complete-button" data-action="finish-auto-pairing">Done</button>`;
}

function renderManualAdd(screen) {
  return `${baseImage(screen)}
    ${hotspot("select-q1", "选择 Q1", 4.5, 28, 28.7, 13.8)}
    ${hotspot("back", "返回未绑定设备首页", 0, 4, 14, 9)}`;
}

function renderManualScan(screen) {
  return `${baseImage(screen)}
    <span class="pairing-title-patch">Connect to Device</span>
    <span class="pairing-edge-patch left scan"></span>
    <span class="pairing-edge-patch right scan"></span>
    <span class="pairing-bottom-patch"><span></span></span>
    ${hotspot("back", "返回设备列表", 0, 4, 14, 9)}
    ${hotspot("finish-scan", "完成扫描", 35, 74, 30, 16)}`;
}

function renderManualConfirm(screen) {
  return `${baseImage(screen)}
    <span class="pairing-title-patch">Connect to Device</span>
    <span class="pairing-edge-patch right confirm"></span>
    <span class="manual-confirm-button">Connect</span>
    <span class="pairing-bottom-patch"><span></span></span>
    ${hotspot("back", "返回扫描设备", 0, 4, 14, 9)}
    ${hotspot("manual-connect", "Connect Q1", 6, 87, 88, 7)}`;
}

function renderManualProgress(screen) {
  return `${baseImage(screen)}
    <span class="pairing-edge-patch left progress"></span>
    <div class="pairing-progress-patch">
      <strong><span class="phone-progress-icon"></span><span data-pairing-progress>${state.pairingProgress}</span>%</strong>
      <p>Connecting to the mobile phone.<br />Keep closer to it.</p>
    </div>
    <span class="pairing-bottom-patch"><span></span></span>
    ${hotspot("back", "返回连接确认", 0, 4, 14, 9)}`;
}

function renderManualComplete(screen) {
  return `${baseImage(screen)}
    <div class="manual-complete-artifact">
      <strong>Q1</strong>
      <p>Connect Successfully <span>${icon("check")}</span></p>
    </div>
    <span class="pairing-bottom-patch"><span></span></span>
    ${hotspot("back", "返回连接确认", 0, 4, 14, 9)}
    ${hotspot("finish-manual-pairing", "完成手动配网", 6, 87, 88, 7)}`;
}

function renderTrainingExperience(screen) {
  if (!["training-guide", "training-guide-final"].includes(screen.id)) return "";
  const playback = state.guideVideoPlaying
    ? `<span class="training-playback-state">${icon("pause")}<small>Playing</small></span>`
    : "";
  const fullscreen = trainingFullscreen
    ? `<div class="training-fullscreen-layer">
        <button type="button" class="training-fullscreen-shade" data-action="training-close-fullscreen" aria-label="关闭全屏教学视频"></button>
        <section class="training-fullscreen-dialog" role="dialog" aria-modal="true" aria-label="How-to video">
          <header><strong>How-to video</strong><button type="button" data-action="training-close-fullscreen" aria-label="关闭全屏教学视频">${icon("x")}</button></header>
          <div class="training-fullscreen-video"><span>${icon(state.guideVideoPlaying ? "pause" : "play")}</span><strong>Disassemble to Clean</strong><small>15 sec · Q1 setup guide</small></div>
          <button type="button" class="training-fullscreen-control" data-action="training-toggle-video">${state.guideVideoPlaying ? "Pause video" : "Play video"}</button>
        </section>
      </div>`
    : "";
  return `${playback}${fullscreen}`;
}

function renderTrainingScreen(screen) {
  if (screen.id === "training-welcome") {
    return `${baseImage(screen)}
      ${hotspot("training-skip", "跳过设备教学", 76.8, 7.2, 17.3, 5.5)}
      ${hotspot("training-start", "开始设备教学", 6, 87.5, 88, 6)}`;
  }

  if (["training-guide", "training-guide-final"].includes(screen.id)) {
    const final = screen.id === "training-guide-final";
    return `${baseImage(screen)}
      <div class="training-guide-title-patch">Q1 Setup</div>
      <div class="training-guide-step-patch">Step ${final ? "2" : "1"}</div>
      ${hotspot("training-exit", "关闭设备教学", 3.8, 6.6, 12.5, 6.3)}
      ${hotspot("training-open-assistant", "打开 Cozy Assistant", 85, 7.4, 12, 6)}
      ${hotspot("training-toggle-video", state.guideVideoPlaying ? "暂停教学视频" : "播放教学视频", 42, 37, 16, 9)}
      ${hotspot("training-open-fullscreen", "全屏查看教学视频", 86, 26, 11, 7)}
      ${hotspot("training-show-how", "展开 How to do it", 4, 65, 92, 7)}
      ${hotspot("training-show-warning", "展开 What to watch out for", 4, 72, 92, 7)}
      ${final ? "" : hotspot("training-back", "上一步", 4.2, 89.5, 30.2, 6.7)}
      ${hotspot(final ? "training-finish" : "training-next", final ? "完成设备设置" : "下一步", final ? 4.1 : 37.6, 89.5, final ? 91.8 : 58.4, 6.8)}
      ${renderTrainingExperience(screen)}`;
  }

  return `${baseImage(screen)}
    <div class="training-ready-copy-patch">Your Q1 is set up and ready.<br />Start your first pumping session.</div>
    <button type="button" class="training-ready-start-button" data-action="training-open-control">Start using Q1</button>
    ${hotspot("training-open-assistant", "打开 Cozy Assistant", 8, 72.7, 84, 7)}
    ${hotspot("training-open-clean-guide", "打开 Clean & Assemble", 8, 80.3, 84, 7)}
    ${hotspot("training-contact-support", "联系 Momcozy 支持", 8, 88, 84, 6.5)}`;
}

function renderAppStatusBar() {
  return `<div class="app-statusbar"><strong>9:41</strong><span>${icon("signal")}${icon("wifi")}<i class="battery-icon" aria-hidden="true"></i></span></div>`;
}

function renderNativeHeader(title, backLabel = "返回") {
  return `<header class="native-header">
    <button type="button" class="native-icon-button" data-action="back" aria-label="${backLabel}">${icon("chevron-left")}</button>
    <strong>${title}</strong>
    <span class="native-header-spacer"></span>
  </header>`;
}

function getSubhomeImage(variant) {
  if (variant === "recorded") return "subhome-recorded.png";
  if (variant === "planned") return state.pumpingLogged ? "subhome-plan-recorded.png" : "subhome-plan-empty.png";
  return "subhome-empty.png";
}

function renderLactationHome(screen, variant, interactive = true) {
  const imageScreen = { ...screen, image: getSubhomeImage(variant) };
  if (!interactive) return baseImage(imageScreen);

  const lactationActions = variant === "empty"
    ? `${figmaHotspot("open-plan-intro", "创建泌乳计划", 71, 44.5, 24, 7)}
       ${figmaHotspot("open-pumping-log", "记录吸乳量", 40, 72, 22, 7)}`
    : variant === "recorded"
      ? `${figmaHotspot("open-plan-intro", "创建泌乳计划", 70, 44.5, 25, 7)}
         ${figmaHotspot("open-pumping-log", "新增吸乳记录", 18, 59, 20, 14)}`
      : `${figmaHotspot("open-plan-intro", "查看泌乳计划", 82, 44.5, 13, 8)}
         ${figmaHotspot("open-pumping-log", "记录吸乳量", 72, 58, 18, 15)}`;

  return `${baseImage(imageScreen)}
    ${figmaHotspot("back", "返回", 2, 6.5, 14, 7)}
    ${figmaHotspot("open-trend", "打开吸乳趋势详情", 4, 13.8, 92, 28.8)}
    ${lactationActions}
    ${figmaHotspot("open-control", "打开 Q1 设备控制", 0, 79.5, 100, 20.5)}`;
}

function renderPumpingTrend() {
  const charts = {
    Day: { amount: "6.75", note: "Today", path: "M0 92 C38 88 62 70 95 74 C126 79 160 45 202 52 C238 58 266 28 320 34" },
    Week: { amount: "24.00", note: "Jun 19 - Jun 25", path: "M0 86 C38 66 74 69 112 80 C150 91 186 62 224 58 C265 54 287 22 320 16" },
    Month: { amount: "86.50", note: "June", path: "M0 96 C42 82 68 84 104 64 C145 42 178 78 216 55 C255 32 290 46 320 18" },
    Year: { amount: "642", note: "2026", path: "M0 102 C34 90 70 58 108 75 C150 92 178 44 218 52 C258 60 282 24 320 14" }
  };
  const chart = charts[state.trendRange];
  const ranges = Object.keys(charts).map((range) => `<button type="button" data-action="set-trend-range" data-range="${range}" ${state.trendRange === range ? 'aria-pressed="true"' : ""}>${range}</button>`).join("");

  return `<div class="native-screen trend-screen">
    ${renderAppStatusBar()}
    ${renderNativeHeader("Pumping Trend", "返回子首页")}
    <div class="trend-segments">${ranges}</div>
    <section class="trend-summary">
      <span><small>Total amount</small><strong>${chart.amount}<em>oz</em></strong></span>
      <span><small>Period</small><strong>${chart.note}</strong></span>
    </section>
    <section class="trend-chart-card">
      <div class="trend-chart-grid"></div>
      <svg class="trend-chart-line" viewBox="0 0 320 120" preserveAspectRatio="none" role="img" aria-label="${state.trendRange} pumping trend">
        <defs><linearGradient id="trendArea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#da8396" stop-opacity=".34"/><stop offset="1" stop-color="#da8396" stop-opacity="0"/></linearGradient></defs>
        <path class="trend-area" d="${chart.path} L320 120 L0 120 Z"></path>
        <path class="trend-line" d="${chart.path}"></path>
        <circle cx="320" cy="${state.trendRange === "Day" ? 34 : state.trendRange === "Week" ? 16 : 18}" r="5"></circle>
      </svg>
      <div class="trend-axis"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div>
    </section>
    <section class="trend-records">
      <header><strong>Pumping records</strong><button type="button" data-action="open-pumping-log">${icon("plus")} Log</button></header>
      <article><span class="record-date"><strong>25</strong><small>Jun</small></span><div><strong>${state.pumpingLogged ? state.milkLeft + state.milkRight : 60} ml</strong><small>${state.pumpingDuration} min · Both sides</small></div><span>21:00</span></article>
      <article><span class="record-date"><strong>24</strong><small>Jun</small></span><div><strong>55 ml</strong><small>18 min · Both sides</small></div><span>17:10</span></article>
      <article><span class="record-date"><strong>23</strong><small>Jun</small></span><div><strong>48 ml</strong><small>20 min · Both sides</small></div><span>12:35</span></article>
    </section>
  </div>`;
}

function renderPumpingLog(screen) {
  const backdrop = state.planCreated ? "planned" : state.pumpingLogged ? "recorded" : "empty";
  return `${renderLactationHome(screen, backdrop, false)}
    <div class="modal-scrim"></div>
    <section class="pumping-sheet figma-log-sheet" role="dialog" aria-modal="true" aria-label="Log Pumping Amount">
      <button type="button" class="figma-log-close" data-action="back" aria-label="关闭">${icon("x")}</button>
      <div class="figma-log-heading">
        <strong>Log Pumping Amount</strong>
        <span>Apr 1, 9:41 AM ${icon("chevron-right")}</span>
      </div>
      ${renderFigmaLogDials()}
      <button type="button" class="sheet-save figma-log-save" data-action="save-pumping-log">Save</button>
      <div class="figma-log-home-indicator" aria-hidden="true"></div>
    </section>`;
}

function renderFigmaLogDial(side, label, amount) {
  const ratio = clamp(amount, 0, 300) / 300;
  const milkHeight = (ratio * 68).toFixed(1);
  const knobTop = (86 - ratio * 52).toFixed(1);
  const actionPrefix = side === "left" ? "milk-left" : "milk-right";

  return `<div class="figma-log-side">
    <div class="figma-log-dial ${side}" style="--milk-height:${milkHeight}%;--knob-top:${knobTop}%">
      <div class="figma-log-vessel">
        <span class="figma-log-letter">${label}</span>
        <span class="figma-log-milk"></span>
      </div>
      <div class="figma-log-knob">
        <button type="button" data-action="${actionPrefix}-up" aria-label="增加${side === "left" ? "左" : "右"}侧奶量">${icon("chevron-up")}</button>
        <button type="button" data-action="${actionPrefix}-down" aria-label="减少${side === "left" ? "左" : "右"}侧奶量">${icon("chevron-down")}</button>
      </div>
    </div>
    <div class="figma-log-amount"><strong>${amount}</strong><span>ml</span></div>
  </div>`;
}

function renderFigmaLogDials() {
  const ticks = Array.from({ length: 11 }, (_, index) => `<i class="${index === 5 ? "major" : index % 2 === 0 ? "medium" : ""}"></i>`).join("");
  return `<div class="figma-log-dials">
    ${renderFigmaLogDial("left", "L", state.milkLeft)}
    <div class="figma-log-scale" aria-hidden="true"><span>300ml</span><div>${ticks}</div><span>0</span></div>
    ${renderFigmaLogDial("right", "R", state.milkRight)}
  </div>`;
}

function renderAmountDials() {
  return `<div class="amount-dials">
    <div class="amount-dial left"><small>L</small><strong>${state.milkLeft}</strong><span>ml</span><div><button type="button" data-action="milk-left-down" aria-label="减少左侧奶量">${icon("minus")}</button><button type="button" data-action="milk-left-up" aria-label="增加左侧奶量">${icon("plus")}</button></div></div>
    <div class="amount-dial right"><small>R</small><strong>${state.milkRight}</strong><span>ml</span><div><button type="button" data-action="milk-right-down" aria-label="减少右侧奶量">${icon("minus")}</button><button type="button" data-action="milk-right-up" aria-label="增加右侧奶量">${icon("plus")}</button></div></div>
  </div>`;
}

function renderPumpingLogged(screen) {
  return `${baseImage(screen)}
    <button type="button" class="hotspot logged-figma-hotspot" data-action="finish-pumping-log" aria-label="完成记录并返回子首页"></button>`;
}

function renderPlanIntro(screen) {
  return `${baseImage(screen)}
    ${figmaHotspot("back", "返回子首页", 2, 7, 14, 7)}
    ${figmaHotspot("start-plan", "开始创建计划", 5, 87.5, 90, 7)}`;
}

function renderPlanForm(screen) {
  return `${baseImage(screen)}
    ${figmaHotspot("back", "返回计划介绍", 2, 7, 14, 7)}
    ${figmaHotspot("plan-age-down", "减少宝宝月龄", 4, 34.5, 16, 7)}
    ${figmaHotspot("plan-age-up", "增加宝宝月龄", 80, 34.5, 16, 7)}
    ${figmaHotspot("set-plan-goal", "选择 Maintain Milk Supply", 4, 47, 92, 8.5, 'data-goal="Maintain Milk Supply"')}
    ${figmaHotspot("set-plan-goal", "选择 Power Pumping", 4, 56.5, 92, 8.5, 'data-goal="Power Pumping"')}
    ${figmaHotspot("set-plan-goal", "选择 Weaning", 4, 66, 92, 8.5, 'data-goal="Weaning"')}
    ${figmaHotspot("generate-plan", "生成计划", 5, 87.5, 90, 7)}`;
}

function renderPlanLoading(screen) {
  return `${baseImage(screen)}
    ${figmaHotspot("back", "返回基础信息", 2, 7, 14, 7)}
    ${figmaHotspot("complete-plan-loading", "查看生成的计划", 5, 87.5, 90, 7)}`;
}

function renderPlanSchedule(screen) {
  return `${baseImage(screen)}
    ${figmaHotspot("back", "返回基础信息", 2, 7, 14, 7)}
    ${state.planTimes.slice(0, 4).map((session, index) => figmaHotspot("toggle-plan-session", `切换计划时段 ${index + 1}`, 4, 30.5 + index * 14.2, 92, 12.5, `data-index="${index}" aria-pressed="${session.active}"`)).join("")}
    ${figmaHotspot("confirm-plan", "确认计划", 4, 89.5, 92, 7)}`;
}

function renderControl(screen) {
  const activeProgramName = state.activeProgramName.trim();
  const programIsActive = activeProgramName.length > 0;
  const modes = [
    { value: "Stimulation", label: "Stimulate", icon: "heart" },
    { value: "Expression", label: "Expression", icon: "droplet" },
    { value: "Mixed", label: "Mixed", icon: "shuffle" },
    { value: "Milk initiation", label: "Milk initiation", icon: "sparkles" }
  ];
  const modeButtons = modes.map((mode) => `<button type="button" class="control-mode-option" data-action="select-control-mode" data-mode="${mode.value}" aria-pressed="${!programIsActive && state.modeName === mode.value}" aria-label="选择 ${mode.value}">
    <span class="control-mode-icon">${icon(mode.icon)}</span>
    <span class="control-mode-label">${mode.label}</span>
  </button>`).join("");
  const frequencyButtons = Array.from({ length: 5 }, (_, index) => `<button type="button" data-action="set-frequency" data-value="${index + 1}" aria-pressed="${state.frequency === index + 1}" aria-label="频率 ${index + 1}">${index + 1}</button>`).join("");
  const lightModeButtons = ["Glow", "Soft", "Clear"].map((mode) => `<button type="button" data-action="set-light-mode" data-mode="${mode}" aria-pressed="${state.lightMode === mode}" aria-label="灯光模式 ${mode}">${mode}</button>`).join("");

  return `${baseImage(screen)}
    <div class="control-base-button-mask" aria-hidden="true"></div>
    <div class="control-device-status" aria-label="蓝牙已连接，设备电量 60%">
      ${icon("bluetooth")}
      <span class="control-device-status-divider" aria-hidden="true"></span>
      ${icon("battery-medium")}
      <span>60%</span>
    </div>
    ${screen.id === "control" ? `<div class="control-ready-patch">${icon("circle-check")}<strong>Ready to Pump</strong></div>` : ""}
    ${programIsActive ? `<div class="control-program-summary" aria-label="Active program ${escapeHtml(activeProgramName)}"><span><strong>${escapeHtml(activeProgramName)}</strong><small>${screen.id === "pumping-active" ? "Sequential program is running." : "Program selected and ready to start."}</small></span><span class="control-program-switch">Switch ${icon("chevron-right")}</span></div>` : ""}
    <div class="control-mode-selector">${modeButtons}</div>
    <div class="control-level-stepper">
      <button type="button" data-action="level-down" aria-label="降低吸力档位">${icon("minus")}</button>
      <span><strong>${state.level}</strong><small>/ 12</small></span>
      <button type="button" data-action="level-up" aria-label="提高吸力档位">${icon("plus")}</button>
    </div>
    <span class="control-section-value control-level-value">${state.level}</span>
    <div class="control-frequency-selector" aria-label="频率选择">${frequencyButtons}</div>
    <span class="control-section-value control-frequency-value">${state.frequency}</span>
    <button type="button" class="control-light-toggle ${state.lightOn ? "on" : ""}" data-action="toggle-light" aria-pressed="${state.lightOn}" aria-label="切换灯光"><span></span></button>
    <div class="control-light-selector ${state.lightOn ? "" : "disabled"}" aria-label="灯光模式选择">${lightModeButtons}</div>
    <span class="control-section-value control-light-value">${state.lightMode}</span>
    ${hotspot("back", "返回子首页", 0, 3.6, 13, 7)}
    <div class="control-header-actions" aria-label="设备帮助与设置">
      <button type="button" data-action="show-help" aria-label="帮助">${icon("circle-help")}</button>
      <button type="button" data-action="open-settings" aria-label="打开设置">${icon("settings")}</button>
    </div>
    ${hotspot("open-mode-list", "打开韵律列表", 72, 29.5, 25.5, 6.5)}`;
}

function renderPumpingActive(screen) {
  return `${renderControl(screen)}
    <div class="pumping-time-patch"><span>${icon("timer")}</span><strong>Pumping Time: <b data-pumping-timer>${formatPumpingTime(state.pumpingSeconds)}</b></strong></div>`;
}

function renderPumpingActiveFooter() {
  return `${state.pumpingPaused ? '<div class="pumping-paused-badge">Paused</div>' : ""}
    <div class="pumping-active-footer">
      <button type="button" class="hold-finish-button" data-action="finish-pumping-session"><span>Hold to Finish</span></button>
      <button type="button" class="pumping-pause-button" data-action="toggle-pumping-pause" aria-label="${state.pumpingPaused ? "继续吸乳" : "暂停吸乳"}">${icon(state.pumpingPaused ? "play" : "pause")}</button>
    </div>`;
}

function renderPumpingFinishLog(screen) {
  return `${renderPumpingActive(screen)}
    <div class="modal-scrim"></div>
    <section class="pumping-sheet session-pumping-sheet" role="dialog" aria-modal="true" aria-label="完成吸乳记录">
      <header><button type="button" data-action="back" aria-label="返回吸乳中">${icon("x")}</button><strong>Log Pumping Amount</strong><span></span></header>
      <p class="sheet-subtitle">Today · ${formatPumpingTime(state.pumpingSeconds)}</p>
      ${renderAmountDials()}
      <div class="session-duration-row"><span><strong>Duration</strong><small>Pumping time</small></span><b>${formatPumpingTime(state.pumpingSeconds)}</b></div>
      <button type="button" class="sheet-save" data-action="save-pumping-session">Save</button>
    </section>`;
}

function renderPumpingSessionLogged(screen) {
  return `${baseImage(screen)}
    <button type="button" class="hotspot logged-figma-hotspot" data-action="finish-pumping-session-log" aria-label="返回更新后的子首页"></button>`;
}

function renderModeList(screen) {
  return `${baseImage(screen)}
    ${figmaHotspot("back", "关闭韵律列表", 2.8, 14.8, 14, 6.2)}
    ${figmaHotspot("request-mode-switch", "切换到 Stimulation", 3.8, 26.6, 92.4, 7.1, 'data-mode="Stimulation"')}
    ${figmaHotspot("request-mode-switch", "切换到 Expression", 3.8, 34.7, 92.4, 7.1, 'data-mode="Expression"')}
    ${figmaHotspot("request-mode-switch", "切换到 Mixed", 3.8, 42.7, 92.4, 7.1, 'data-mode="Mixed"')}
    ${figmaHotspot("request-mode-switch", "切换到 Milk initiation", 3.8, 50.8, 92.4, 7.1, 'data-mode="Milk initiation"')}
    ${figmaHotspot("open-program-new", "Create Program", 72, 59.6, 24, 4.7)}
    ${figmaHotspot("request-program-run", "切换到 Milk Boost Mode P1", 5.2, 64.5, 89.6, 14.7, 'data-program="Milk Boost Mode P1"')}
    ${figmaHotspot("request-program-run", "切换到 Milk Boost Mode P2", 5.2, 80.3, 89.6, 14.7, 'data-program="Milk Boost Mode P2"')}
    ${figmaHotspot("open-program-detail", "查看 Milk Boost Mode P1 详情", 73, 64.8, 21.8, 5.3, 'data-program="Milk Boost Mode P1"')}
    ${figmaHotspot("open-program-detail", "查看 Milk Boost Mode P2 详情", 73, 80.6, 21.8, 5.3, 'data-program="Milk Boost Mode P2"')}`;
}

function renderRhythmConfirmation() {
  if (!["control", "pumping-active"].includes(state.currentId) || (!state.pendingProgramRun && !state.pendingModeSelection)) return "";
  const isProgram = Boolean(state.pendingProgramRun);
  const rhythmName = escapeHtml(isProgram ? state.pendingProgramRun : state.pendingModeSelection);
  const title = isProgram ? "Switch to Program?" : "Switch to Mode?";
  const description = "Switching will exit your current running preset and apply the selected mode";
  const confirmAction = isProgram ? "confirm-program-run" : "confirm-mode-switch";

  return `<div class="program-confirm-layer">
    <button type="button" class="program-confirm-scrim" data-action="cancel-rhythm-confirmation" aria-label="Cancel ${rhythmName}"></button>
    <section class="program-confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="rhythm-confirm-title" aria-describedby="rhythm-confirm-description">
      <h2 id="rhythm-confirm-title">${title}</h2>
      <p id="rhythm-confirm-description">${description}</p>
      <div class="program-confirm-actions">
        <button type="button" class="primary" data-action="${confirmAction}">Confirm Switch</button>
        <button type="button" data-action="cancel-rhythm-confirmation">Not Now</button>
      </div>
    </section>
  </div>`;
}

function renderProgramNew(screen) {
  const draft = escapeHtml(state.programDraft);
  const description = escapeHtml(state.descriptionDraft);
  const nameLength = state.programDraft.trim().length;
  const showError = nameLength === 0 || nameLength > 32;
  const disabled = showError;

  return `${baseImage(screen)}
    ${hotspot("back", "取消新增 Program", 0, 20.6, 24, 7.5)}
    <input class="new-program-field new-program-name" data-program-name maxlength="64" value="${draft}" placeholder="Please enter the mode name" aria-label="Program name" autocomplete="off" />
    <textarea class="new-program-field new-program-description" data-program-description maxlength="80" placeholder="Default description copy" aria-label="Program description">${description}</textarea>
    <span class="new-program-error${showError ? " is-visible" : ""}" data-program-error aria-live="polite">${showError ? "Input too long. Max 32 characters." : ""}</span>
    <button type="button" class="visible-save" data-action="save-program" ${disabled ? "disabled" : ""}>Save</button>`;
}

function renderProgramDetail(screen) {
  return `${baseImage(screen)}
    ${hotspot("back", "返回韵律列表", 0, 4.8, 17, 8)}
    ${hotspot("delete-program", "删除 Program", 88, 4.8, 12, 8)}
    ${hotspot("edit-program", "编辑 Program 名称", 77, 15, 18, 8)}
    ${figmaHotspot("show-program-actions", "打开分段复制与删除操作", 9, 31, 87, 10)}
    ${figmaHotspot("add-section", "Add Section", 9, 42, 87, 8)}
    ${figmaHotspot("save-program-detail", "保存 Program", 6, 89, 88, 7.5)}`;
}

function renderProgramSectionEditor(screen, restMode = false) {
  const modeButtons = [
    ["Massage", 8, 18.4, 41, 4.7],
    ["Breastfeeding", 50, 18.4, 41, 4.7],
    ["Mixing", 8, 23.4, 41, 4.7],
    ["Lactation", 50, 23.4, 41, 4.7],
    ["Rest", 8, 28.4, 41, 4.7]
  ].map(([mode, left, top, width, height]) => figmaHotspot("set-section-mode", `选择 ${mode}`, left, top, width, height, `data-mode="${mode}"`)).join("");
  const durationTop = restMode ? 39.2 : 61.3;
  const levelPatch = !restMode && state.sectionDraft.level !== 1
    ? `<span class="program-editor-level-value">${state.sectionDraft.level}<small>/ 12</small></span>`
    : "";
  const frequencyPatch = !restMode && state.sectionDraft.frequency !== 5
    ? `<span class="program-editor-frequency-state" data-value="${state.sectionDraft.frequency}" style="--frequency-index:${state.sectionDraft.frequency - 1}"></span>`
    : "";
  const durationIndex = [5, 10, 15, 20].indexOf(state.sectionDraft.duration);
  const durationLeft = durationIndex === 1 ? 37 : durationIndex === 2 ? 66 : 8;
  const durationSelectedTop = durationIndex === 3 ? durationTop + 5.5 : durationTop;
  const durationLabel = durationIndex === 3 ? "Custom" : `${state.sectionDraft.duration}mins`;
  const durationPatch = durationIndex > 0
    ? `<span class="program-editor-duration-reset" style="top:${durationTop}%">5mins</span><span class="program-editor-duration-state" style="left:${durationLeft}%;top:${durationSelectedTop}%">${durationLabel}</span>`
    : "";
  const modePatch = (!restMode && state.sectionDraft.mode !== "Massage")
    ? `${PROGRAM_SECTION_MODES.slice(0, 4).map((mode, index) => `<span class="program-editor-mode-option" style="left:${index % 2 === 0 ? 8 : 50}%;top:${index < 2 ? 18.4 : 23.4}%">${mode}</span>`).join("")}<span class="program-editor-mode-state" style="left:${state.sectionDraft.mode === "Breastfeeding" || state.sectionDraft.mode === "Lactation" ? 50 : 8}%;top:${state.sectionDraft.mode === "Breastfeeding" ? 18.4 : 23.4}%">${escapeHtml(state.sectionDraft.mode)}</span>`
    : "";

  return `${baseImage(screen)}
    ${modePatch}${levelPatch}${frequencyPatch}${durationPatch}
    ${figmaHotspot("back", "返回韵律详情", 0, 3.2, 16, 6.5)}
    ${modeButtons}
    ${restMode ? "" : `${figmaHotspot("section-level-down", "降低档位", 8, 39.6, 22, 4.9)}
      ${figmaHotspot("section-level-up", "提高档位", 70, 39.6, 22, 4.9)}
      ${Array.from({ length: 5 }, (_, index) => figmaHotspot("set-section-frequency", `频率 ${index + 1}`, 8 + index * 16.8, 51.1, 16.8, 4.6, `data-value="${index + 1}"`)).join("")}`}
    ${figmaHotspot("set-section-duration", "5 分钟", 8, durationTop, 26, 4.8, 'data-value="5"')}
    ${figmaHotspot("set-section-duration", "10 分钟", 37, durationTop, 26, 4.8, 'data-value="10"')}
    ${figmaHotspot("set-section-duration", "15 分钟", 66, durationTop, 26, 4.8, 'data-value="15"')}
    ${figmaHotspot("set-section-duration", "自定义时长", 8, durationTop + 5.5, 26, 4.8, 'data-value="20"')}
    ${restMode ? "" : figmaHotspot("try-program-section", "试听当前韵律", 39, 75, 22, 8)}
    ${figmaHotspot("confirm-add-section", "保存该分段", 1, 89.6, 98, 6.5)}`;
}

function renderProgramDetailSection(screen, actionsOpen = false) {
  return `${baseImage(screen)}
    ${figmaHotspot("back", "返回上一步", 0, 4.8, 17, 8)}
    ${figmaHotspot("delete-program", "删除 Program", 88, 4.8, 12, 8)}
    ${figmaHotspot("edit-program", "编辑 Program 名称", 77, 15, 18, 8)}
    ${actionsOpen ? `${figmaHotspot("hide-program-actions", "关闭分段操作", 0, 31, 57, 20)}
      ${figmaHotspot("duplicate-program-section", "复制分段", 57, 42, 19, 9)}
      ${figmaHotspot("delete-program-section", "删除分段", 76, 42, 20, 9)}` : `${figmaHotspot("show-program-actions", "打开分段复制与删除操作", 9, 31, 87, 10)}
      ${figmaHotspot("add-section", "Add Section", 4, 46, 92, 8)}`}
    ${figmaHotspot("save-program-detail", "保存 Program", 1, 89, 98, 7.5)}`;
}

function renderProgramModeSelection(screen) {
  return `<img class="phone-image program-mode-selection-backdrop" src="./assets/hd/device-control.png?v=${VERSION}" width="${DEVICE_VIEWPORT.width}" height="${DEVICE_VIEWPORT.height}" alt="" draggable="false" />
    <span class="program-mode-selection-scrim" aria-hidden="true"></span>
    <img class="program-mode-selection-image" src="./assets/hd/${screen.image}?v=${VERSION}" width="${DEVICE_VIEWPORT.width}" height="${DEVICE_VIEWPORT.height}" alt="Mode Selection" draggable="false" />
    ${figmaHotspot("back", "关闭 Mode Selection", 88, 20, 10, 7)}
    ${figmaHotspot("open-program-new", "Create Program", 76, 28, 22, 7)}
    ${figmaHotspot("select-saved-program", "选择 Milk Boost Mode P1", 4, 35, 92, 20)}
    ${figmaHotspot("open-saved-program-detail", "查看 Program 详情", 72, 35, 24, 9)}`;
}

function renderSettings(screen) {
  return `${baseImage(screen)}
    ${hotspot("back", "返回设备控制", 0, 6, 18, 9)}
    ${hotspot("open-firmware", "Firmware Upgrade", 4, 30.6, 92, 7.2)}
    ${hotspot("restore-factory", "Restore Factory", 4, 37.4, 92, 7)}
    ${hotspot("delete-device", "Delete device", 4, 44.5, 92, 8)}`;
}

function renderFirmwareAlert(screen) {
  return `${baseImage(screen)}
    ${hotspot("confirm-firmware", "Confirm firmware upgrade", 16, 49.6, 68, 6.8)}
    ${hotspot("cancel-firmware", "Cancel firmware upgrade", 16, 56.3, 68, 6.8)}`;
}

function renderFirmwareUpgrade(screen) {
  const completed = state.progress >= 100;
  return `${baseImage(screen)}
    <div class="upgrade-cover">
      <div class="upgrade-meter" style="--progress:${state.progress}">
        <span class="upgrade-meter-value"><strong data-progress-value>${state.progress}</strong><span>%</span></span>
      </div>
    </div>
    ${completed ? '<div class="upgrade-status-patch" data-upgrade-status>Upgrade complete</div>' : ""}
    ${hotspot("back", "返回设置", 0, 6, 16, 8)}
    ${completed ? '<button type="button" class="upgrade-done" data-action="finish-upgrade">Done</button>' : ""}`;
}

function renderScreen(screen) {
  switch (screen.id) {
    case "pairing-home": return renderPairingHome(screen);
    case "auto-discovery": return renderAutoDiscovery(screen);
    case "auto-connecting": return renderAutoConnecting(screen);
    case "auto-complete": return renderAutoComplete(screen);
    case "manual-add": return renderManualAdd(screen);
    case "manual-scan": return renderManualScan(screen);
    case "manual-confirm": return renderManualConfirm(screen);
    case "manual-progress": return renderManualProgress(screen);
    case "manual-complete": return renderManualComplete(screen);
    case "training-welcome":
    case "training-guide":
    case "training-guide-final":
    case "training-ready": return renderTrainingScreen(screen);
    case "lactation-empty": return renderLactationHome(screen, "empty");
    case "pumping-trend": return renderPumpingTrend();
    case "pumping-log": return renderPumpingLog(screen);
    case "pumping-logged": return renderPumpingLogged(screen);
    case "lactation-recorded": return renderLactationHome(screen, "recorded");
    case "plan-intro": return renderPlanIntro(screen);
    case "plan-form": return renderPlanForm(screen);
    case "plan-loading": return renderPlanLoading(screen);
    case "plan-schedule": return renderPlanSchedule(screen);
    case "home": return renderLactationHome(screen, "planned");
    case "control": return renderControl(screen);
    case "pumping-active": return renderPumpingActive(screen);
    case "pumping-finish-log": return renderPumpingFinishLog(screen);
    case "pumping-session-logged": return renderPumpingSessionLogged(screen);
    case "mode-list": return renderModeList(screen);
    case "program-new": return renderProgramNew(screen);
    case "program-detail": return renderProgramDetail(screen);
    case "program-section-create": return renderProgramSectionEditor(screen);
    case "program-section-rest": return renderProgramSectionEditor(screen, true);
    case "program-detail-section": return renderProgramDetailSection(screen);
    case "program-detail-actions": return renderProgramDetailSection(screen, true);
    case "program-mode-selection": return renderProgramModeSelection(screen);
    case "settings": return renderSettings(screen);
    case "firmware-alert": return renderFirmwareAlert(screen);
    case "firmware-upgrade": return renderFirmwareUpgrade(screen);
    default: return baseImage(screen);
  }
}

function renderReviewPanel(screen) {
  const rhythmLabel = state.activeProgramName ? "Program" : "Mode";
  const rhythmValue = state.activeProgramName || state.modeName;

  return `<aside class="review-panel" aria-label="流程状态">
    <section class="review-card">
      <header><h2>使用流程</h2><span>Q1 V1.2</span></header>
      <ol class="path-list">
        <li><b>01</b><span>设备连接起点 → 未绑定首页</span></li>
        <li><b>02</b><span>自动发现 → Q1 → Connect → Done</span></li>
        <li><b>03</b><span>手动添加 → 扫描 Q1 → Connect</span></li>
        <li><b>04</b><span>设备教学 → Get started → Finish Setup</span></li>
        <li><b>05</b><span>吸乳趋势 → 周期详情</span></li>
        <li><b>06</b><span>Log Pumping → Logged</span></li>
        <li><b>07</b><span>AI Plan → 信息 → 日程</span></li>
        <li><b>08</b><span>设备控制 → Start Pumping</span></li>
        <li><b>09</b><span>Hold to Finish → Log → Logged</span></li>
        <li><b>10</b><span>Switch → 韵律与 Program</span></li>
        <li><b>11</b><span>设置 → 固件升级</span></li>
      </ol>
    </section>
    <section class="review-card">
      <header><h2>当前状态</h2><span>${screen.label}</span></header>
      <div class="state-grid">
        <div class="state-cell"><small>Device</small><strong>${state.bound ? "Bound" : "Unbound"}</strong></div>
        <div class="state-cell"><small>${rhythmLabel}</small><strong title="${escapeHtml(rhythmValue)}">${escapeHtml(rhythmValue)}</strong></div>
        <div class="state-cell"><small>Level</small><strong>${state.level} / 12</strong></div>
        <div class="state-cell"><small>Frequency</small><strong>${state.frequency}</strong></div>
        <div class="state-cell"><small>Light</small><strong>${state.lightOn ? `On · ${state.lightMode}` : "Off"}</strong></div>
        <div class="state-cell"><small>Pumping</small><strong>${state.pumpingLogged ? `${state.milkLeft + state.milkRight} ml` : "No record"}</strong></div>
        <div class="state-cell"><small>AI Plan</small><strong>${state.planCreated ? "Created" : "Not created"}</strong></div>
        <div class="state-cell"><small>Session</small><strong>${getPumpingSessionStatus()}</strong></div>
      </div>
    </section>
    <section class="review-card">
      <header><h2>快速定位</h2><span>评审控制</span></header>
      <div class="quick-actions">
        <button type="button" class="review-button" data-action="restart-pairing">连接流程起点</button>
        <button type="button" class="review-button" data-action="restart-auto-pairing">自动发现</button>
        <button type="button" class="review-button" data-action="restart-manual-pairing">手动添加</button>
        <button type="button" class="review-button" data-action="jump" data-screen="training-welcome">设备教学</button>
        <button type="button" class="review-button" data-action="jump" data-screen="lactation-empty">初始子首页</button>
        <button type="button" class="review-button" data-action="jump" data-screen="pumping-log">记录吸乳量</button>
        <button type="button" class="review-button" data-action="jump" data-screen="plan-intro">AI 泌乳计划</button>
        <button type="button" class="review-button" data-action="jump" data-screen="home">已有计划首页</button>
        <button type="button" class="review-button" data-action="jump" data-screen="control">设备控制</button>
        <button type="button" class="review-button" data-action="jump" data-screen="pumping-active">吸乳中</button>
        <button type="button" class="review-button" data-action="jump" data-screen="pumping-finish-log">完成吸乳</button>
        <button type="button" class="review-button" data-action="jump" data-screen="mode-list">韵律列表</button>
        <button type="button" class="review-button" data-action="jump" data-screen="settings">设置页</button>
        <button type="button" class="review-button" data-action="jump" data-screen="firmware-alert">升级弹框</button>
      </div>
    </section>
  </aside>`;
}

function render() {
  const previousStage = document.querySelector(".stage");
  const previousScroll = document.getElementById("phone-scroll");
  if (previousStage?.dataset.currentScreen && previousScroll) {
    screenScrollPositions.set(previousStage.dataset.currentScreen, previousScroll.scrollTop);
  }

  const screen = screenById.get(state.currentId) || screenById.get("pairing-home");
  const canvasHeight = screen.canvasHeight || DEVICE_VIEWPORT.height;
  const controlStickyFooter = screen.id === "control" ? `<div class="control-sticky-footer">
    <button type="button" class="control-start-button" data-action="start-pumping">Start Pumping</button>
    <span class="control-home-indicator" aria-hidden="true"></span>
  </div>` : "";
  const pumpingStickyFooter = screen.id === "pumping-active" ? renderPumpingActiveFooter() : "";
  if (state.currentId !== "firmware-upgrade" && upgradeTimer) {
    clearInterval(upgradeTimer);
    upgradeTimer = null;
  }
  if (state.currentId !== "plan-loading" && planTimer) {
    clearInterval(planTimer);
    planTimer = null;
  }
  if ((!isPumpingSessionRunning() || state.pumpingPaused) && pumpingTimer) {
    clearInterval(pumpingTimer);
    pumpingTimer = null;
  }
  if (state.currentId !== "pumping-session-logged" && sessionLoggedTimer) {
    clearTimeout(sessionLoggedTimer);
    sessionLoggedTimer = null;
  }
  clearPairingTimers();

  document.getElementById("app").innerHTML = `${renderSidebar()}
    ${renderTopbar(screen)}
    <main class="stage" data-current-screen="${screen.id}">
      <div class="phone-slot" id="phone-slot">
        <section class="phone-frame" id="phone-frame" style="width:${DEVICE_VIEWPORT.width}px;height:${DEVICE_VIEWPORT.height}px" aria-label="${screen.label}">
          <div class="phone-scroll" id="phone-scroll">
            <div class="phone-canvas" style="width:${DEVICE_VIEWPORT.width}px;height:${canvasHeight}px">
              ${renderScreen(screen)}
            </div>
          </div>
          ${renderRhythmConfirmation()}
          ${controlStickyFooter}
          ${pumpingStickyFooter}
        </section>
      </div>
    </main>
    ${renderReviewPanel(screen)}`;

  document.title = `${screen.label} · Momcozy Q1`;
  window.history.replaceState(null, "", `#${screen.id}`);
  if (window.lucide) window.lucide.createIcons({ attrs: { "stroke-width": 1.8 } });
  requestAnimationFrame(() => {
    fitFrame();
    const phoneScroll = document.getElementById("phone-scroll");
    if (phoneScroll) phoneScroll.scrollTop = screenScrollPositions.get(screen.id) || 0;
    document.querySelector(".program-confirm-actions .primary")?.focus();
    document.querySelector('.screen-nav button[aria-current="page"]')?.scrollIntoView({ block: "nearest" });
  });
  if (screen.id === "firmware-upgrade") startUpgrade();
  if (screen.id === "plan-loading") startPlanGeneration();
  if (isPumpingSessionRunning()) startPumpingClock();
  if (screen.id === "pumping-session-logged") scheduleSessionLoggedTransition();
  schedulePairingFlow(screen.id);
}

function fitFrame() {
  const stage = document.querySelector(".stage");
  const frame = document.getElementById("phone-frame");
  const slot = document.getElementById("phone-slot");
  if (!stage || !frame || !slot) return;
  const { width, height } = DEVICE_VIEWPORT;
  const scale = Math.min((stage.clientWidth - 36) / width, (stage.clientHeight - 36) / height, 1);
  frame.style.transform = `scale(${Math.max(scale, 0.2)})`;
  slot.style.width = `${width * scale}px`;
  slot.style.height = `${height * scale}px`;
}

function goTo(screenId, push = true) {
  if (!screenById.has(screenId) || screenId === state.currentId) return;
  if (push) screenHistory.push(state.currentId);
  if (!["training-guide", "training-guide-final"].includes(screenId)) trainingFullscreen = false;
  if (screenId !== "mode-list") {
    state.pendingProgramRun = "";
    state.pendingModeSelection = "";
  }
  state.currentId = screenId;
  render();
}

function goBack() {
  const target = screenHistory.pop() || fallbackBackTargets[state.currentId] || "pairing-home";
  trainingFullscreen = false;
  if (state.currentId === "mode-list") state.modeListReturnId = "";
  state.pendingProgramRun = "";
  state.pendingModeSelection = "";
  state.currentId = target;
  render();
}

function showRhythmConfirmationOnControl() {
  const returnId = ["control", "pumping-active"].includes(state.modeListReturnId)
    ? state.modeListReturnId
    : "control";
  if (screenHistory.at(-1) === returnId) screenHistory.pop();
  state.modeListReturnId = "";
  state.currentId = returnId;
  render();
}

function finishProgramEditing() {
  const programFlowScreens = new Set([
    "mode-list",
    "program-new",
    "program-detail",
    "program-section-create",
    "program-section-rest",
    "program-detail-section",
    "program-detail-actions",
    "program-mode-selection"
  ]);

  while (programFlowScreens.has(screenHistory.at(-1))) screenHistory.pop();
  state.pendingProgramRun = "";
  state.pendingModeSelection = "";
  state.currentId = "mode-list";
  render();
}

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), QUICK_DELAY.toast);
}

function resetDemo() {
  if (upgradeTimer) clearInterval(upgradeTimer);
  upgradeTimer = null;
  if (planTimer) clearInterval(planTimer);
  planTimer = null;
  if (pumpingTimer) clearInterval(pumpingTimer);
  pumpingTimer = null;
  if (sessionLoggedTimer) clearTimeout(sessionLoggedTimer);
  sessionLoggedTimer = null;
  clearPairingTimers();
  localStorage.removeItem(STORAGE_KEY);
  Object.assign(state, {
    currentId: "pairing-home",
    bound: false,
    autoDiscoveryQueued: true,
    pairingProgress: 33,
    modeName: "Stimulation",
    level: 1,
    frequency: 1,
    lightOn: true,
    lightMode: "Clear",
    programName: "Personal-01 wait a minute wait a mi",
    programDescription: "Enhancess breastfeeding by boosting milk supply, ideal for moms looking to increase...",
    programDraft: "",
    descriptionDraft: "",
    programEditingExisting: false,
    programSections: [createProgramSection({ duration: 11 })],
    sectionDraft: createProgramSection({ frequency: 5, duration: 5 }),
    progress: 27,
    milkLeft: 210,
    milkRight: 210,
    pumpingDuration: 20,
    pumpingLogged: false,
    trendRange: "Week",
    planCreated: false,
    planAgeMonths: 1,
    feedingMethod: "Breastfeeding",
    planGoal: "Power Pumping",
    planTimes: [
      { time: "07:00", end: "07:30", active: true },
      { time: "10:00", end: "10:30", active: true },
      { time: "18:00", end: "18:30", active: true },
      { time: "22:00", end: "22:30", active: true }
    ],
    planProgress: 12,
    pumpingSeconds: 810,
    pumpingPaused: false,
    sessionLoggedAutoAdvance: false,
    pendingProgramRun: "",
    pendingModeSelection: "",
    activeProgramName: "",
    modeListReturnId: "",
    guideVideoPlaying: false
  });
  trainingFullscreen = false;
  screenHistory.length = 0;
  render();
  showToast("Q1 Demo 已重置");
}

function restartPairing(startId, autoDiscoveryQueued = false) {
  clearPairingTimers();
  state.bound = false;
  state.autoDiscoveryQueued = autoDiscoveryQueued;
  state.pairingProgress = 33;
  state.currentId = startId;
  screenHistory.length = 0;
  persistState();
  render();
}

function clearPairingTimers() {
  if (pairingTimer) clearTimeout(pairingTimer);
  if (pairingProgressTimer) clearInterval(pairingProgressTimer);
  pairingTimer = null;
  pairingProgressTimer = null;
}

function schedulePairingFlow(screenId) {
  if (screenId === "pairing-home" && state.autoDiscoveryQueued) {
    pairingTimer = setTimeout(() => {
      pairingTimer = null;
      state.autoDiscoveryQueued = false;
      if (state.currentId === "pairing-home") goTo("auto-discovery", false);
    }, QUICK_DELAY.autoDiscovery);
  }

  if (screenId === "auto-connecting") {
    pairingTimer = setTimeout(() => {
      pairingTimer = null;
      if (state.currentId !== "auto-connecting") return;
      state.bound = true;
      persistState();
      goTo("auto-complete", false);
    }, QUICK_DELAY.autoConnect);
  }

  if (screenId === "manual-scan") {
    pairingTimer = setTimeout(() => {
      pairingTimer = null;
      if (state.currentId === "manual-scan") goTo("manual-confirm", false);
    }, QUICK_DELAY.manualScan);
  }

  if (screenId === "manual-progress") startPairingProgress();
}

function startPairingProgress() {
  state.pairingProgress = state.pairingProgress >= 100 ? 33 : clamp(state.pairingProgress, 33, 100);
  pairingProgressTimer = setInterval(() => {
    state.pairingProgress = Math.min(100, state.pairingProgress + 1);
    const value = document.querySelector("[data-pairing-progress]");
    if (value) value.textContent = String(state.pairingProgress);
    if (state.pairingProgress < 100) return;
    clearInterval(pairingProgressTimer);
    pairingProgressTimer = null;
    state.bound = true;
    persistState();
    goTo("manual-complete", false);
    showToast("Q1 connected successfully");
  }, 55);
}

function startUpgrade() {
  if (state.progress >= 100 || upgradeTimer) return;
  upgradeTimer = setInterval(() => {
    state.progress = Math.min(100, state.progress + 1);
    const value = document.querySelector("[data-progress-value]");
    const meter = document.querySelector(".upgrade-meter");
    if (value) value.textContent = String(state.progress);
    if (meter) meter.style.setProperty("--progress", state.progress);
    if (state.progress >= 100) {
      clearInterval(upgradeTimer);
      upgradeTimer = null;
      render();
      showToast("Firmware update complete");
    }
  }, 85);
}

function startPlanGeneration() {
  if (state.planProgress >= 100 || planTimer) return;
  planTimer = setInterval(() => {
    state.planProgress = Math.min(100, state.planProgress + 4);
    const value = document.querySelector("[data-plan-progress]");
    const orbit = document.querySelector(".plan-progress-orbit");
    if (value) value.textContent = String(state.planProgress);
    if (orbit) orbit.style.setProperty("--plan-progress", state.planProgress);
    if (state.planProgress < 100) return;
    clearInterval(planTimer);
    planTimer = null;
    if (state.currentId === "plan-loading") goTo("plan-schedule", false);
  }, 80);
}

function startPumpingClock() {
  if (state.pumpingPaused || pumpingTimer) return;
  pumpingTimer = setInterval(() => {
    state.pumpingSeconds += 1;
    const timer = document.querySelector("[data-pumping-timer]");
    if (timer) timer.textContent = formatPumpingTime(state.pumpingSeconds);
  }, 1000);
}

function scheduleSessionLoggedTransition() {
  if (!state.sessionLoggedAutoAdvance || sessionLoggedTimer) return;
  sessionLoggedTimer = setTimeout(() => {
    sessionLoggedTimer = null;
    if (state.currentId !== "pumping-session-logged") return;
    state.sessionLoggedAutoAdvance = false;
    screenHistory.length = 0;
    state.currentId = "home";
    render();
  }, QUICK_DELAY.sessionLogged);
}

function updateProgramDraftUi() {
  const saveButton = document.querySelector(".visible-save");
  const error = document.querySelector("[data-program-error]");
  const nameLength = state.programDraft.trim().length;
  const showError = nameLength === 0 || nameLength > 32;
  if (saveButton) saveButton.disabled = showError;
  if (error) {
    error.classList.toggle("is-visible", showError);
    error.textContent = showError ? "Input too long. Max 32 characters." : "";
  }
}

function handleAction(action, target) {
  switch (action) {
    case "restart-pairing":
      restartPairing("pairing-home");
      break;
    case "restart-auto-pairing":
      restartPairing("pairing-home", true);
      break;
    case "restart-manual-pairing":
      restartPairing("manual-add");
      break;
    case "start-auto-discovery":
      state.autoDiscoveryQueued = false;
      goTo("auto-discovery");
      break;
    case "open-manual-pairing":
      state.autoDiscoveryQueued = false;
      goTo("manual-add");
      break;
    case "auto-connect": goTo("auto-connecting"); break;
    case "finish-auto-pairing":
      state.bound = true;
      persistState();
      screenHistory.length = 0;
      state.currentId = "lactation-empty";
      render();
      showToast("Q1 is ready to use");
      break;
    case "select-q1": goTo("manual-scan"); break;
    case "finish-scan": goTo("manual-confirm"); break;
    case "manual-connect":
      state.pairingProgress = 33;
      goTo("manual-progress");
      break;
    case "finish-manual-pairing":
      state.bound = true;
      persistState();
      screenHistory.length = 0;
      state.currentId = "control";
      render();
      showToast("Q1 connected successfully");
      break;
    case "training-start": goTo("training-guide"); break;
    case "training-skip": goTo("training-ready"); break;
    case "training-exit": goBack(); break;
    case "training-back": goTo("training-welcome"); break;
    case "training-next": goTo("training-guide-final"); break;
    case "training-finish": goTo("training-ready"); break;
    case "training-toggle-video":
      state.guideVideoPlaying = !state.guideVideoPlaying;
      render();
      showToast(state.guideVideoPlaying ? "Tutorial video is playing" : "Tutorial video paused");
      break;
    case "training-open-fullscreen":
      trainingFullscreen = true;
      render();
      break;
    case "training-close-fullscreen":
      trainingFullscreen = false;
      render();
      break;
    case "training-show-how": showToast("Remove the collection cup, then detach the flange and valve in order"); break;
    case "training-show-warning": showToast("Power off before cleaning and keep electronic parts dry"); break;
    case "training-open-control":
      state.bound = true;
      persistState();
      goTo("control");
      showToast("Device tutorial completed");
      break;
    case "training-open-assistant": showToast("Cozy Assistant entry opened"); break;
    case "training-open-clean-guide": goTo("training-guide"); break;
    case "training-contact-support": showToast("Momcozy support · support@momcozy.com"); break;
    case "open-trend": goTo("pumping-trend"); break;
    case "set-trend-range":
      state.trendRange = target.dataset.range || "Week";
      persistState();
      render();
      break;
    case "open-pumping-log":
      state.sessionLoggedAutoAdvance = false;
      goTo("pumping-log");
      break;
    case "milk-left-down":
      state.milkLeft = clamp(state.milkLeft - 5, 0, 300);
      render();
      break;
    case "milk-left-up":
      state.milkLeft = clamp(state.milkLeft + 5, 0, 300);
      render();
      break;
    case "milk-right-down":
      state.milkRight = clamp(state.milkRight - 5, 0, 300);
      render();
      break;
    case "milk-right-up":
      state.milkRight = clamp(state.milkRight + 5, 0, 300);
      render();
      break;
    case "set-duration":
      state.pumpingDuration = clamp(Number(target.dataset.value), 5, 60);
      render();
      break;
    case "save-pumping-log":
      state.pumpingLogged = true;
      persistState();
      goTo("pumping-logged", false);
      break;
    case "finish-pumping-log":
      screenHistory.length = 0;
      state.currentId = state.planCreated ? "home" : "lactation-recorded";
      render();
      showToast("Pumping record saved");
      break;
    case "open-plan-intro": goTo("plan-intro"); break;
    case "start-plan": goTo("plan-form"); break;
    case "set-plan-goal":
      state.planGoal = target.dataset.goal || "Power Pumping";
      persistState();
      render();
      break;
    case "plan-age-down":
      state.planAgeMonths = clamp(state.planAgeMonths - 1, 0, 36);
      persistState();
      showToast(`Baby's age: ${state.planAgeMonths} month${state.planAgeMonths === 1 ? "" : "s"}`);
      break;
    case "plan-age-up":
      state.planAgeMonths = clamp(state.planAgeMonths + 1, 0, 36);
      persistState();
      showToast(`Baby's age: ${state.planAgeMonths} month${state.planAgeMonths === 1 ? "" : "s"}`);
      break;
    case "generate-plan":
      state.planProgress = 12;
      persistState();
      goTo("plan-loading");
      break;
    case "complete-plan-loading":
      state.planProgress = 100;
      if (planTimer) clearInterval(planTimer);
      planTimer = null;
      goTo("plan-schedule", false);
      break;
    case "toggle-plan-session": {
      const index = Number(target.dataset.index);
      if (!Number.isInteger(index) || !state.planTimes[index]) break;
      state.planTimes[index] = { ...state.planTimes[index], active: !state.planTimes[index].active };
      persistState();
      render();
      break;
    }
    case "confirm-plan":
      state.planCreated = true;
      persistState();
      screenHistory.length = 0;
      state.currentId = "home";
      render();
      showToast("AI lactation plan created");
      break;
    case "open-control": goTo("control"); break;
    case "open-mode-list":
      state.modeListReturnId = state.currentId;
      state.pendingProgramRun = "";
      state.pendingModeSelection = "";
      goTo("mode-list");
      break;
    case "open-program-new":
      state.programDraft = "";
      state.descriptionDraft = "";
      state.programEditingExisting = false;
      goTo("program-new");
      break;
    case "open-program-detail":
      state.programName = target.dataset.program || state.programName;
      goTo("program-detail");
      break;
    case "request-program-run":
      state.pendingProgramRun = target.dataset.program || "Milk Boost Mode P1";
      state.pendingModeSelection = "";
      showRhythmConfirmationOnControl();
      break;
    case "request-mode-switch":
      state.pendingModeSelection = target.dataset.mode || "Stimulation";
      state.pendingProgramRun = "";
      showRhythmConfirmationOnControl();
      break;
    case "cancel-rhythm-confirmation":
      state.pendingProgramRun = "";
      state.pendingModeSelection = "";
      render();
      break;
    case "confirm-program-run":
      state.activeProgramName = state.pendingProgramRun;
      state.pendingProgramRun = "";
      persistState();
      render();
      showToast(`${state.activeProgramName} selected`);
      break;
    case "confirm-mode-switch": {
      const selectedMode = state.pendingModeSelection || "Stimulation";
      state.pendingModeSelection = "";
      state.modeName = selectedMode;
      state.activeProgramName = "";
      persistState();
      render();
      showToast(`${state.modeName} selected`);
      break;
    }
    case "save-program":
      if (!state.programDraft.trim()) return;
      state.programName = state.programDraft.trim();
      state.programDescription = state.descriptionDraft.trim() || "Enhancess breastfeeding by boosting milk supply, ideal for moms looking to increase...";
      if (!state.programEditingExisting) state.programSections = [createProgramSection({ duration: 11 })];
      state.programEditingExisting = false;
      persistState();
      goTo("program-detail", false);
      showToast("Program saved");
      break;
    case "edit-program":
      state.programDraft = state.programName;
      state.descriptionDraft = state.programDescription;
      state.programEditingExisting = true;
      goTo("program-new");
      break;
    case "save-program-detail":
      persistState();
      finishProgramEditing();
      showToast("Program updated");
      break;
    case "delete-program":
      state.programName = "Personal-01";
      state.programSections = [createProgramSection({ duration: 11 })];
      persistState();
      goTo("mode-list");
      showToast("Program deleted");
      break;
    case "add-section":
      if (state.programSections.length >= MAX_PROGRAM_SECTIONS) {
        showToast(`Maximum ${MAX_PROGRAM_SECTIONS} sections`);
        return;
      }
      state.sectionDraft = createProgramSection({ frequency: 5, duration: 5 });
      goTo("program-section-create");
      break;
    case "set-section-mode":
      state.sectionDraft.mode = PROGRAM_SECTION_MODES.includes(target.dataset.mode) ? target.dataset.mode : "Massage";
      if (state.sectionDraft.mode === "Rest" && state.currentId !== "program-section-rest") goTo("program-section-rest", false);
      else if (state.sectionDraft.mode !== "Rest" && state.currentId === "program-section-rest") goTo("program-section-create", false);
      else showToast(`${state.sectionDraft.mode} selected`);
      break;
    case "section-level-down":
      state.sectionDraft.level = clamp(state.sectionDraft.level - 1, 1, 12);
      render();
      break;
    case "section-level-up":
      state.sectionDraft.level = clamp(state.sectionDraft.level + 1, 1, 12);
      render();
      break;
    case "set-section-frequency":
      state.sectionDraft.frequency = clamp(Number(target.dataset.value) || 1, 1, 5);
      render();
      break;
    case "set-section-duration":
      state.sectionDraft.duration = clamp(Number(target.dataset.value) || 10, 5, 30);
      render();
      showToast(`${state.sectionDraft.duration} minutes selected`);
      break;
    case "try-program-section":
      showToast(`Trying ${state.sectionDraft.mode}`);
      break;
    case "confirm-add-section":
      if (state.programSections.length >= MAX_PROGRAM_SECTIONS) return;
      state.programSections = [...state.programSections, createProgramSection(state.sectionDraft)];
      persistState();
      goTo("program-detail-section", false);
      showToast(`Section ${state.programSections.length} added`);
      break;
    case "show-program-actions":
      goTo("program-detail-actions", false);
      break;
    case "hide-program-actions":
      goTo("program-detail-section", false);
      break;
    case "duplicate-program-section":
      if (state.programSections.length >= MAX_PROGRAM_SECTIONS) {
        showToast(`Maximum ${MAX_PROGRAM_SECTIONS} sections`);
        return;
      }
      state.programSections = [...state.programSections, createProgramSection(state.programSections.at(-1))];
      persistState();
      goTo("program-detail-section", false);
      showToast("Section duplicated");
      break;
    case "delete-program-section":
      if (state.programSections.length <= 1) {
        showToast("At least 1 section is required");
        return;
      }
      state.programSections = state.programSections.slice(0, -1);
      persistState();
      goTo("program-detail-section", false);
      showToast("Section deleted");
      break;
    case "open-saved-program-detail":
      goTo("program-detail-section");
      break;
    case "select-saved-program":
      state.activeProgramName = state.programName || "Milk Boost Mode P1";
      state.modeName = "";
      persistState();
      screenHistory.length = 0;
      state.currentId = "control";
      render();
      showToast(`${state.activeProgramName} selected`);
      break;
    case "select-control-mode":
      state.modeName = target.dataset.mode || "Stimulation";
      state.activeProgramName = "";
      persistState();
      render();
      showToast(`${state.modeName} selected`);
      break;
    case "level-down":
      state.level = clamp(state.level - 1, 1, 12);
      persistState();
      render();
      break;
    case "level-up":
      state.level = clamp(state.level + 1, 1, 12);
      persistState();
      render();
      break;
    case "set-frequency":
      state.frequency = clamp(Number(target.dataset.value), 1, 5);
      persistState();
      render();
      break;
    case "set-light-mode":
      state.lightMode = target.dataset.mode || "Clear";
      state.lightOn = true;
      persistState();
      render();
      break;
    case "toggle-light":
      state.lightOn = !state.lightOn;
      persistState();
      render();
      break;
    case "start-pumping":
      state.activeProgramName = "";
      state.pumpingSeconds = 810;
      state.pumpingPaused = false;
      state.milkLeft = 0;
      state.milkRight = 0;
      state.sessionLoggedAutoAdvance = false;
      goTo("pumping-active");
      showToast("Pumping started");
      break;
    case "toggle-pumping-pause":
      state.pumpingPaused = !state.pumpingPaused;
      render();
      showToast(state.pumpingPaused ? "Pumping paused" : "Pumping resumed");
      break;
    case "finish-pumping-session":
      state.pumpingPaused = true;
      state.pumpingDuration = clamp(Math.round(state.pumpingSeconds / 60), 1, 60);
      goTo("pumping-finish-log");
      break;
    case "save-pumping-session":
      state.pumpingLogged = true;
      state.pumpingDuration = clamp(Math.round(state.pumpingSeconds / 60), 1, 60);
      state.sessionLoggedAutoAdvance = true;
      persistState();
      goTo("pumping-session-logged", false);
      break;
    case "finish-pumping-session-log":
      state.sessionLoggedAutoAdvance = false;
      screenHistory.length = 0;
      state.currentId = "home";
      render();
      showToast("Pumping session completed");
      break;
    case "show-help": showToast("Q1 device assistant"); break;
    case "open-settings": goTo("settings"); break;
    case "open-firmware": goTo("firmware-alert"); break;
    case "cancel-firmware": goBack(); break;
    case "confirm-firmware":
      state.progress = 27;
      goTo("firmware-upgrade");
      break;
    case "finish-upgrade":
      screenHistory.length = 0;
      state.currentId = "settings";
      render();
      showToast("Q1 firmware is up to date");
      break;
    case "restore-factory": showToast("Restore Factory confirmation opened"); break;
    case "delete-device": showToast("Delete device confirmation opened"); break;
    case "back": goBack(); break;
    case "jump":
      if (target.dataset.screen === "pairing-home") state.autoDiscoveryQueued = false;
      if (target.dataset.screen === "manual-progress") state.pairingProgress = 33;
      if (target.dataset.screen === "mode-list") state.modeListReturnId = state.currentId;
      if (target.dataset.screen === "pumping-active") {
        state.pumpingSeconds = 810;
        state.pumpingPaused = false;
      }
      if (target.dataset.screen === "pumping-session-logged") state.sessionLoggedAutoAdvance = false;
      goTo(target.dataset.screen);
      break;
    case "previous": {
      const index = screens.findIndex((screen) => screen.id === state.currentId);
      if (index > 0) goTo(screens[index - 1].id);
      break;
    }
    case "next": {
      const index = screens.findIndex((screen) => screen.id === state.currentId);
      if (index < screens.length - 1) goTo(screens[index + 1].id);
      break;
    }
    case "reset": resetDemo(); break;
  }
}

document.addEventListener("click", (event) => {
  const target = event.target.closest("[data-action]");
  if (!target || target.disabled) return;
  handleAction(target.dataset.action, target);
});

document.addEventListener("input", (event) => {
  if (event.target.matches("[data-program-name]")) {
    state.programDraft = event.target.value;
    updateProgramDraftUi();
  }
  if (event.target.matches("[data-program-description]")) {
    state.descriptionDraft = event.target.value;
  }
});

document.addEventListener("change", (event) => {
  if (event.target.matches(".mobile-picker")) goTo(event.target.value);
  if (event.target.matches("[data-plan-age]")) {
    state.planAgeMonths = clamp(Number(event.target.value), 0, 36);
    persistState();
  }
  if (event.target.matches("[data-feeding-method]")) {
    state.feedingMethod = event.target.value;
    persistState();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (trainingFullscreen) {
    trainingFullscreen = false;
    render();
    return;
  }
  if (state.pendingProgramRun || state.pendingModeSelection) {
    state.pendingProgramRun = "";
    state.pendingModeSelection = "";
    render();
    return;
  }
  if (state.currentId !== "pairing-home") goBack();
});

window.addEventListener("resize", fitFrame);
render();
