const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const configPath = path.join(__dirname, "config.json");

const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
const { serverPort, securityHeaders } = config;

app.use((req, res, next) => {
    Object.entries(securityHeaders).forEach(([header, value]) => {
        res.setHeader(header, value);
    });
    next();
});

app.get("/", (req, res) => {
    res.send("✅ Secure server with headers enabled!");
});

app.listen(serverPort, () => {
    console.log(`✅ Secure server running on http://localhost:${serverPort}`);
});


