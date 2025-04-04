(function() {
    function detectIframes() {
        try {
            return top.document.domain !== document.domain;
        } catch (e) {
            return true; 
        }
    }

    function createOverlay(message) {
        if (detectIframes()) {
            let overlay = document.createElement("div");
            overlay.style.position = "fixed";
            overlay.style.top = "0";
            overlay.style.left = "0";
            overlay.style.width = "100vw";
            overlay.style.height = "100vh";
            overlay.style.backgroundColor = "rgba(128, 128, 128, 0.6)";
            overlay.style.zIndex = "9999999";
            overlay.style.display = "flex";
            overlay.style.justifyContent = "center";
            overlay.style.alignItems = "center";
            overlay.style.color = "#fff";
            document.body.appendChild(overlay);
        }
    }
    
    document.addEventListener("keydown", (event) => {
        if (event.key.toLowerCase() === "c") {
            document.addEventListener("keydown", function cjListener(e) {
                if (e.key.toLowerCase() === "j") {
                    removeOverlay();
                    console.warn("Clickjacking protection removed via CJ shortcut.");
                    document.removeEventListener("keydown", cjListener);
                }
            }, { once: true });
        }
    });
    
    function removeOverlay() {
        const overlays = document.querySelectorAll(".clickjacking-overlay");
        overlays.forEach(overlay => {
            overlay.style.opacity = "0";
            setTimeout(() => overlay.remove(), 500);
        });
    }    

    window.addEventListener("DOMContentLoaded", function() {
        fetch('config.json')
            .then(response => response.json())
            .then(config => {
                if (config.clickJacking) {
                    createOverlay(config.warningMessage);
                }
            })
            .catch(() => console.warn("Config file not found, using defaults."));
    });
})();
