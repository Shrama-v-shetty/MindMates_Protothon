const express = require("express");
const router = express.Router();
const fetch = require("node-fetch"); // make sure you installed node-fetch

router.post("/", async (req, res) => {
    try {
        const userMessage = req.body.message;

        const ollamaResponse = await fetch(
            "http://localhost:11434/api/generate",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    model: "llama3",
                    prompt: userMessage,
                    stream: false
                })
            }
        );

        const data = await ollamaResponse.json();

        if (data.response) {
            res.json({ reply: data.response });
        } else {
            res.status(500).json({ error: "No response from Ollama" });
        }
    } catch (err) {
        console.error("Ollama error:", err);
        res.status(500).json({ error: "Ollama not responding" });
    }
});

module.exports = router;

