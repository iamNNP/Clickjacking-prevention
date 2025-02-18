(async function () {
    try {
        const response = await fetch("./config.json");
        const config = await response.json();

        switch (config.mode) {
            case "framebusting":
                if (window.top !== window.self) {
                    document.body.innerHTML = "";
                    window.top.location = window.self.location;
                }
                break;
                
            case "overlay":
                if (window.top !== window.self) {
                    const protector = document.createElement("div");
                    protector.id = "protector";
                    protector.innerHTML = `<a href="/" target="_blank">Перейти к сайту</a>`;

                    // Стили для оверлея
                    protector.style.position = "absolute";
                    protector.style.top = "0";
                    protector.style.left = "0";
                    protector.style.width = "100%";
                    protector.style.height = "100%";
                    protector.style.background = "rgba(0, 0, 0, 0.8)";
                    protector.style.color = "white";
                    protector.style.display = "flex";
                    protector.style.alignItems = "center";
                    protector.style.justifyContent = "center";
                    protector.style.zIndex = "99999999";
                    protector.style.fontSize = "20px";

                    document.body.appendChild(protector);

                    try {
                        if (top.document.domain === document.domain) {
                            protector.remove();
                        }
                    } catch (e) {
                        console.warn("Cross-origin issue detected, keeping overlay.");
                    }
                }
                break;
    
            default:
                console.warn("Invalid clickjacking prevention mode in config.json");
        }    
    } catch (error) {
        console.error("Error loading config.json:", error);
    }
})();

