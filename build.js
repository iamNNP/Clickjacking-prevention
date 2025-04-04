const fs = require("fs");
const path = require("path");
const { minify } = require("terser");

// Load config.json
const configPath = "./config.json";
let config = {
    doubleClickJacking: true,
    warningMessage: "Clickjacking detected! This page is being loaded in an iframe.",
    clickJacking: true,
    mouseDelay: 777
};

if (fs.existsSync(configPath)) {
    const configFile = fs.readFileSync(configPath, "utf8");
    config = JSON.parse(configFile);
}

// Read source files
const srcDir = "./src";
const distDir = "./dist";

// Ensure the dist directory exists
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
}

fs.readdirSync(srcDir).forEach(async (file) => {
    if (file.endsWith(".js")) {
        const filePath = path.join(srcDir, file);
        const outputFilePath = path.join(distDir, file.replace(".js", ".min.js"));

        let code = fs.readFileSync(filePath, "utf8");

        // Inject config values into the code
        code = code.replace(/__CLICKJACKING_ENABLED__/g, config.clickJacking)
                   .replace(/__DOUBLECLICKJACKING_ENABLED__/g, config.doubleClickJacking)
                   .replace(/__WARNING_MESSAGE__/g, JSON.stringify(config.warningMessage))
                   .replace(/__MOUSE_DELAY__/g, config.mouseDelay * 1000);

        // Minify JavaScript
        const result = await minify(code);

        if (result.code) {
            fs.writeFileSync(outputFilePath, result.code, "utf8");
            console.log(`✅ Minified: ${file} -> ${outputFilePath}`);
        } else {
            console.error(`❌ Failed to minify: ${file}`);
        }
    }
});
