(function() {
    let overlay;
    let removeOverlayTimeout;
    let mouseMoved = false;
    let mouseClicked = false;
    let mouseDelay = 777 * 1000; // Default 777 seconds

    function createOverlay() {
        overlay = document.createElement("div");
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100vw";
        overlay.style.height = "100vh";
        overlay.style.backgroundColor = "rgba(128, 128, 128, 0.4)";
        overlay.style.zIndex = "9999999";
        document.body.appendChild(overlay);
    }

    function removeOverlay() {
        if (overlay) {
            overlay.style.opacity = "0";
            setTimeout(() => {
                if (overlay) overlay.remove();
                overlay = null;
            }, 500);
        }
    }

    function startProtection() {
        createOverlay();
        
        window.addEventListener("mousemove", () => {
            if (!mouseMoved) {
                mouseMoved = true;
                removeOverlayTimeout = setTimeout(removeOverlay, mouseDelay);
            }
        }, { once: true });

        window.addEventListener("mousedown", () => {
            if (!mouseClicked) {
                mouseClicked = true;
                removeOverlayTimeout = setTimeout(removeOverlay, mouseDelay);
            }
        }, { once: true });
    }

    window.addEventListener("DOMContentLoaded", function() {
        fetch('config.json')
            .then(response => response.json())
            .then(config => {
                if (config.doubleClickJacking) {
                    mouseDelay = config.mouseDelay * 1000;
                    startProtection();
                }
            })
            .catch(() => console.warn("Config file not found, using defaults."));
    });
})();

