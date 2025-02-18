const esbuild = require("esbuild");
const fs = require("fs");

const configPath = "./src/config.json";
const outputDir = "./dist";
const clickJackingOutputFile = `${outputDir}/clickJackingPrevention.min.js`;
const doubleClickJackingOutputFile = `${outputDir}/doubleClickJackingPrevention.min.js`;

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
const script = fs.readFileSync("./src/clickJackingPrevention.js", "utf8");

const modifiedScript = script.replace(
    'fetch("./config.json")',
    `Promise.resolve(${JSON.stringify(config)})`
);

const tempFile = "./temp_index.js";
fs.writeFileSync(tempFile, modifiedScript);

esbuild.build({
    entryPoints: [tempFile],
    outfile: clickJackingOutputFile,
    minify: true,
    bundle: true,
    platform: "browser",
})
    .then(() => {
        console.log(`✅ Built: ${clickJackingOutputFile}`);
        fs.unlinkSync(tempFile); // Clean up
    })
    .catch((error) => {
        console.error("❌ Build failed:", error);
    });

if (config.doubleClickJacking) {
    esbuild.build({
        entryPoints: ["./src/doubleClickJackingPrevention.js"],
        outfile: doubleClickJackingOutputFile,
        minify: true,
        bundle: true,
        platform: "browser",
    }).then(() => {
        console.log(`✅ Built: ${doubleClickJackingOutputFile}`);
    }).catch((error) => {
        console.error("❌ DoubleClickJacking build failed:", error);
    });
} else {
    console.log("ℹ️ DoubleClickJacking protection is disabled in config.json.");
}