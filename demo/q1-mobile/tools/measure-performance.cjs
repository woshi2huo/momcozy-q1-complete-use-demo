const { chromium } = require("playwright");
const fs = require("node:fs");

const baseUrl = process.env.Q1_BASE_URL || "http://127.0.0.1:4173/demo/q1-mobile/";
const outputPath = process.env.Q1_PERF_OUTPUT || "/tmp/q1-performance.json";
const bandwidth = Number(process.env.Q1_PERF_MBPS || 10);
const latency = Number(process.env.Q1_PERF_LATENCY || 80);

async function main() {
  const browser = await chromium.launch();
  try {
    const context = await browser.newContext({ viewport: { width: 420, height: 912 }, isMobile: true, hasTouch: true });
    const page = await context.newPage();
    const session = await context.newCDPSession(page);
    await session.send("Network.enable");
    await session.send("Network.emulateNetworkConditions", {
      offline: false,
      latency,
      downloadThroughput: bandwidth * 1000000 / 8,
      uploadThroughput: 5000000 / 8
    });
    await session.send("Emulation.setCPUThrottlingRate", { rate: 4 });
    await page.goto(baseUrl);
    await page.waitForFunction(() => typeof screens !== "undefined");
    await page.evaluate(() => {
      preloadRuntimeImages = () => {};
      preloadGeneration += 1;
      preloadQueue = [];
    });
    await page.waitForFunction(() => preloadRunning === 0);
    const screenIds = await page.evaluate(() => screens.map(screen => screen.id));
    const results = [];
    for (const screenId of screenIds) {
      await session.send("Network.clearBrowserCache");
      const result = await page.evaluate(async screenId => {
        const started = performance.now();
        state.currentId = screenId;
        state.activeProgramName = screenId === "control-program" ? "Milk Boost Mode P1" : "";
        state.sessionLoggedAutoAdvance = false;
        render();
        clearPairingTimers();
        clearInterval(planTimer);
        planTimer = null;
        clearInterval(upgradeTimer);
        upgradeTimer = null;
        const images = [...document.querySelectorAll("#phone-frame img")].filter(image => image.getClientRects().length && getComputedStyle(image).display !== "none");
        const failures = [];
        await Promise.all(images.map(image => image.decode().catch(() => failures.push(image.src))));
        const imagesReady = performance.now() - started;
        await new Promise(resolve => requestAnimationFrame(resolve));
        await Promise.all(document.getAnimations().filter(animation => Number.isFinite(animation.effect.getTiming().iterations)).map(animation => animation.finished.catch(() => {})));
        await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        return { screen: screenId, imagesReady: Math.round(imagesReady), complete: Math.round(performance.now() - started), failures };
      }, screenId);
      results.push(result);
      console.log(JSON.stringify(result));
    }
    const report = { viewport: "420x912", bandwidthMbps: bandwidth, latencyMs: latency, cpuSlowdown: 4, cacheClearedBeforeEachScreen: true, results };
    fs.writeFileSync(outputPath, JSON.stringify(report, null, 2) + "\n");
    console.log(JSON.stringify({ outputPath, maximum: Math.max(...results.map(result => result.complete)), over400: results.filter(result => result.complete >= 400).map(result => result.screen) }));
    if (results.some(result => result.failures.length || result.complete >= 400)) process.exitCode = 1;
  } finally {
    await browser.close();
  }
}

main().catch(error => { console.error(error); process.exitCode = 1; });
