(function() {
    const config = {
        clickJacking: __CLICKJACKING_ENABLED__,
        warningMessage: __WARNING_MESSAGE__,
        overlayColor: __OVERLAY_COLOR__
    };

    let overlay = null;
    let cjListener = null;

    function detectIframes() {
        try {
            return window !== top || top.document.domain !== document.domain;
        } catch (e) {
            return true;
        }
    }

    function createOverlay() {
        if (!overlay && detectIframes()) {
            overlay = document.createElement("div");
            overlay.className = "clickjacking-overlay";
            Object.assign(overlay.style, {
                position: "fixed",
                top: "0",
                left: "0",
                width: "100vw",
                height: "100vh",
                backgroundColor: config.overlayColor,
                zIndex: "9999999",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#fff",
                fontSize: "20px",
                fontWeight: "bold"
            });
            overlay.textContent = config.warningMessage;
            document.body.appendChild(overlay);
            return true;
        }
        return false;
    }

    function removeOverlay() {
        if (overlay) {
            overlay.style.opacity = "0";
            setTimeout(() => overlay.remove(), 300);
        }
        if (cjListener) {
            document.removeEventListener("keydown", cjListener);
        }
    }

    function initialize() {
        if (!config.clickJacking) return;
        
        if (createOverlay()) {
            document.addEventListener("keydown", (e) => {
                if (e.key.toLowerCase() === "c") {
                    document.addEventListener("keydown", (e2) => {
                        if (e2.key.toLowerCase() === "j") removeOverlay();
                    }, { once: true });
                }
            });
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initialize);
    } else {
        initialize();
    }
})();