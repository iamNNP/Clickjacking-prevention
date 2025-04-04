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
