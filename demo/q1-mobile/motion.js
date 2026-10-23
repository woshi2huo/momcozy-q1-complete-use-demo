(() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const easing = "cubic-bezier(0.22, 1, 0.36, 1)";
  let lastAction = "";

  function animate(element, frames, duration = 220) {
    if (!element || reducedMotion.matches) return;
    return element.animate(frames, { duration, easing });
  }

  window.demoMotion = {
    capture(nextScreen) {
      const frame = document.getElementById("phone-frame");
      const previousScreen = document.querySelector(".stage")?.dataset.currentScreen;
      const dialog = document.querySelector(".program-confirm-dialog");
      if (!frame || reducedMotion.matches) return null;
      const snapshot = { previousScreen, nextScreen, hadDialog: Boolean(dialog), action: lastAction, scrollTop: document.getElementById("phone-scroll")?.scrollTop || 0 };
      if (dialog && previousScreen === nextScreen) {
        snapshot.closingDialog = dialog.closest(".program-confirm-layer").cloneNode(true);
        snapshot.closingDialog.inert = true;
        snapshot.closingDialog.style.pointerEvents = "none";
        snapshot.closingDialog.setAttribute("aria-hidden", "true");
        for (const node of snapshot.closingDialog.querySelectorAll("[id], [data-action]")) {
          node.removeAttribute("id");
          node.removeAttribute("data-action");
        }
      }
      if (previousScreen !== nextScreen) {
        const layer = document.createElement("div");
        layer.className = "motion-previous-screen";
        layer.inert = true;
        layer.setAttribute("aria-hidden", "true");
        for (const child of frame.children) {
          if (child.classList.contains("motion-previous-screen") || child.classList.contains("motion-touch")) continue;
          const clone = child.cloneNode(true);
          for (const node of [clone, ...clone.querySelectorAll("[id], [data-action]")]) {
            node.removeAttribute("id");
            node.removeAttribute("data-action");
          }
          layer.append(clone);
          clone.scrollTop = child.scrollTop;
        }
        snapshot.layer = layer;
      }
      return snapshot;
    },
    play(snapshot) {
      if (!snapshot || reducedMotion.matches) return;
      const frame = document.getElementById("phone-frame");
      if (!frame || document.querySelector(".stage")?.dataset.currentScreen !== snapshot.nextScreen) return;
      const changed = snapshot.previousScreen !== snapshot.nextScreen;
      if (changed) {
        const backward = /back|close|cancel|finish-pumping.*log/.test(snapshot.action);
        const controlScreens = ["control", "control-program", "pumping-active"];
        const sameControl = controlScreens.includes(snapshot.previousScreen) && controlScreens.includes(snapshot.nextScreen);
        const openingList = snapshot.nextScreen === "mode-list";
        const closingList = snapshot.previousScreen === "mode-list" && backward;
        const distance = sameControl || openingList || closingList ? 0 : backward ? -18 : 22;
        const duration = openingList ? 120 : closingList ? 280 : sameControl ? 160 : 260;
        for (const child of frame.children) {
          if (!openingList) animate(child, [{ opacity: 0.55, translate: `${distance}px 0` }, { opacity: 1, translate: "0 0" }], duration);
        }
        if (openingList) {
          animate(frame.querySelector(".mode-list-sheet"), [{ translate: "0 86%" }, { translate: "0 0" }], 320);
          animate(frame.querySelector(".mode-list-backdrop"), [{ opacity: 0 }, { opacity: 1 }], 180);
        }
        if (closingList) {
          animate(snapshot.layer.querySelector(".mode-list-sheet"), [{ translate: "0 0" }, { translate: "0 86%" }], 280);
        }
        frame.append(snapshot.layer);
        const previousScroll = snapshot.layer.querySelector(".phone-scroll");
        if (previousScroll) previousScroll.scrollTop = snapshot.scrollTop;
        animate(snapshot.layer, [{ opacity: 1, translate: "0 0" }, { opacity: 0, translate: `${-distance / 2}px 0` }], duration)?.finished.then(() => snapshot.layer.remove(), () => snapshot.layer.remove());
      }
      if (!changed && snapshot.closingDialog && !frame.querySelector(".program-confirm-dialog")) {
        frame.append(snapshot.closingDialog);
        animate(snapshot.closingDialog, [{ opacity: 1 }, { opacity: 0 }], 160)?.finished.then(() => snapshot.closingDialog.remove(), () => snapshot.closingDialog.remove());
      }
      if (changed || !snapshot.hadDialog) {
        animate(frame.querySelector(".program-confirm-dialog"), [{ opacity: 0, translate: "0 14px", scale: "0.97" }, { opacity: 1, translate: "0 0", scale: "1" }], 240);
        animate(frame.querySelector(".program-confirm-scrim"), [{ opacity: 0 }, { opacity: 1 }], 180);
      }
      if (changed && snapshot.nextScreen === "pumping-finish-log") {
        animate(frame.querySelector(".session-figma-log"), [{ translate: "0 48px", opacity: 0.4 }, { translate: "0 0", opacity: 1 }], 300);
      }
    }
  };

  document.addEventListener("click", (event) => {
    lastAction = event.target.closest("[data-action]")?.dataset.action || "";
  }, true);

  document.addEventListener("pointerdown", (event) => {
    const target = event.target.closest("button, [data-action]");
    const frame = target?.closest(".phone-frame");
    if (!frame || target.disabled || reducedMotion.matches) return;
    const bounds = frame.getBoundingClientRect();
    const scale = bounds.width / frame.offsetWidth;
    const touch = document.createElement("span");
    touch.className = "motion-touch";
    touch.setAttribute("aria-hidden", "true");
    touch.style.left = `${(event.clientX - bounds.left) / scale}px`;
    touch.style.top = `${(event.clientY - bounds.top) / scale}px`;
    frame.append(touch);
    animate(touch, [{ scale: "0.45", opacity: 0.2 }, { scale: "1.25", opacity: 0 }], 240)?.finished.then(() => touch.remove(), () => touch.remove());
  }, { passive: true });
})();
