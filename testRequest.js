const axios = require("axios");

async function testGrammarCheck() {
    try {
        const response = await axios.post(
            "https://api.languagetool.org/v2/check",
            `text=This+is+an+test.&language=en-US`,
            {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
            }
        );
        console.log("Response data:", response.data);
    } catch (error) {
        console.error("Error details:", error.response ? error.response.data : error.message);
    }
}

testGrammarCheck();