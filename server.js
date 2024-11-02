const express = require("express");
const axios = require("axios");
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Create endpoint to check grammar
app.post("/api/check-grammar", async (req, res) => {
    const { text, language = "en-US" } = req.body;

    try {
        // Exact Axios request from the test script
        const response = await axios.post(
            "https://api.languagetool.org/v2/check",
            `text=${encodeURIComponent(text)}&language=${encodeURIComponent(language)}`,
            {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
            }
        );

        const feedback = response.data.matches.map((match) => ({
            message: match.message,
            offset: match.offset,
            length: match.length,
            suggestions: match.replacements.map((r) => r.value),
        }));

        res.json({ success: true, feedback });
    } catch (error) {
        console.error("Error details:", error.response ? error.response.data : error.message);
        res.status(500).json({
            success: false,
            error: error.response ? error.response.data : "An error occurred whilest checking grammar."
        });
    }
});