const fs = require("fs");
const path = require("path");
const { minify } = require("terser");

const defaultConfig = {
    clickJacking: true,
    doubleClickJacking: true,
    warningMessage: "Clickjacking detected! This page is being loaded in an iframe.",
    mouseDelay: 777,
    overlayColor: "rgba(128, 128, 128, 0.4)",
    opacity: 0.4
};

let config = { ...defaultConfig };
const configPath = path.join(__dirname, "config.json");

if (fs.existsSync(configPath)) {
    try {
        const configFile = fs.readFileSync(configPath, "utf8");
        config = { ...defaultConfig, ...JSON.parse(configFile) };
    } catch (e) {
        console.error("❌ Error loading config.json, using defaults");
    }
} else {
    fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2));
    console.log("ℹ️ Created default config.json");
}

const builds = [
    {
        name: "clickjacking",
        src: "./src/clickjacking.js",
        dist: "./dist/clickjacking.min.js",
        replacements: {
            "__CLICKJACKING_ENABLED__": config.clickJacking,
            "__WARNING_MESSAGE__": JSON.stringify(config.warningMessage),
            "__OVERLAY_COLOR__": JSON.stringify(config.overlayColor)
        }
    },
    {
        name: "doubleclickjacking",
        src: "./src/doubleclickjacking.js",
        dist: "./dist/doubleclickjacking.min.js",
        replacements: {
            "__DOUBLECLICKJACKING_ENABLED__": config.doubleClickJacking,
            "__MOUSE_DELAY__": config.mouseDelay,
            "__OVERLAY_COLOR__": JSON.stringify(config.overlayColor),
            "__OVERLAY_OPACITY__": config.opacity
        }
    }
];

const distDir = path.join(__dirname, "dist");
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
}

async function buildFiles() {
    for (const build of builds) {
        try {
            let code = fs.readFileSync(build.src, "utf8");
            
            for (const [key, value] of Object.entries(build.replacements)) {
                code = code.replace(new RegExp(key, "g"), value);
            }
            
            const result = await minify(code, {
                mangle: true,
                compress: true
            });
            
            if (result.code) {
                fs.writeFileSync(build.dist, result.code);
                console.log(`✅ Built: ${build.name} -> ${build.dist}`);
            } else {
                console.error(`❌ Minification failed for ${build.name}`);
            }
        } catch (err) {
            console.error(`❌ Build failed for ${build.name}:`, err.message);
        }
    }
}

// Run build
buildFiles();