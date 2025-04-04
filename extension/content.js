let doubleClickProtection = true;
let clickJackingProtection = true;
let overlay = null;
let removeOverlayTimeout;
let mouseDelay = 777;
let mouseMoved = false;
let mouseClicked = false;

function createOverlay() {
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "clickjacking-protection-overlay";
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.backgroundColor = "rgba(128, 128, 128, 0.4)";
    overlay.style.zIndex = "9999999";
    overlay.style.transition = "opacity 0.5s ease-out";
    document.body.appendChild(overlay);
  }
}

function removeOverlay() {
  if (overlay) {
    overlay.style.opacity = "0"; // Fade out effect
    setTimeout(() => {
      if (overlay) overlay.remove();
      overlay = null;
    }, 500);
    clearTimeout(removeOverlayTimeout);
  }
}

function initializeProtection() {
  createOverlay();

  let isIframe = false;
  const iframes = document.querySelectorAll("iframe");
  if (iframes.length > 0) {
    isIframe = true;
    console.warn(`Detected ${iframes.length} iframe(s) in the document.`);
  }

  if (clickJackingProtection && isIframe) {
    console.warn("ClickJacking protection active: Overlay stays.");
    return;
  }

  if (doubleClickProtection) {
    window.addEventListener("mousemove", () => {
      if (!mouseMoved) {
        mouseMoved = true;
        console.warn(`Mouse moved, starting ${mouseDelay}s countdown.`);
        removeOverlayTimeout = setTimeout(() => {
          removeOverlay();
          console.warn("DoubleClickJacking protection removed.");
        }, mouseDelay);
      }
    }, { once: true });
    window.addEventListener("mousedown", () => {
      if (!mouseClicked) {
        mouseClicked = true;
        console.warn(`Mouse clicked, starting ${mouseDelay}s countdown.`);
        removeOverlayTimeout = setTimeout(() => {
          removeOverlay();
          console.warn("DoubleClickJacking protection removed.");
        }, mouseDelay);
      }
    }, { once: true });
  } else {
    removeOverlay();
  }
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request) => {
  doubleClickProtection = request.doubleClickProtection;
  clickJackingProtection = request.clickJackingProtection;
  mouseDelay = request.mouseDelay || 777;
  initializeProtection();
});

// Load settings from storage
chrome.storage.sync.get(["doubleClickProtection", "clickJackingProtection", "mouseDelay"], (data) => {
  doubleClickProtection = data.doubleClickProtection !== false;
  clickJackingProtection = data.clickJackingProtection !== false;
  mouseDelay = data.mouseDelay || 777;
  initializeProtection();
});
