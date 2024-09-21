const express = require("express");
require("dotenv").config();

const app = express();

app.get('/', (req, res) => {
    res.json({
        api: "Arcane_API",
        version: "v2",
        started: Date.now(),
        outdated: false
    })
});

app.get('/backend', (req, res) => {
    res.json({
        backend: "ArcaneBackendV3",
        version: "v0.25",
        started: Date.now()
    })
})

app.get('/backend/timeline', (req, res) => {
    const seasonStart = process.env.API_SEASON_START;
    const seasonEnd = process.env.API_SEASON_END;

    res.json({
        seasonStart: seasonStart,
        seasonEnd: seasonEnd
    })
})

module.exports = app;