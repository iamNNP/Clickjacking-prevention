(function() {
    const config = {
        enabled: __DOUBLECLICKJACKING_ENABLED__,
        mouseDelay: __MOUSE_DELAY__,
        overlayColor: __OVERLAY_COLOR__,
        opacity: __OVERLAY_OPACITY__
    };

    let overlay = null;
    let timeout = null;

    function createOverlay() {
        if (overlay) return;
        
        overlay = document.createElement("div");
        overlay.className = "dcj-overlay";
        Object.assign(overlay.style, {
            position: "fixed",
            top: "0",
            left: "0",
            width: "100vw",
            height: "100vh",
            backgroundColor: config.overlayColor,
            opacity: config.opacity,
            zIndex: "9999998",
            pointerEvents: "auto"
        });
        document.body.appendChild(overlay);
    }

    function removeOverlay() {
        if (!overlay) return;
        overlay.style.opacity = "0";
        setTimeout(() => overlay.remove(), 300);
        clearTimeout(timeout);
    }

    function initialize() {
        if (!config.enabled) return;
        
        createOverlay();
        
        window.addEventListener("mousemove", () => {
            clearTimeout(timeout);
            timeout = setTimeout(removeOverlay, config.mouseDelay);
        }, { once: true });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initialize);
    } else {
        initialize();
    }
})();