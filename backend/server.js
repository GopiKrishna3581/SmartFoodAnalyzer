require("dotenv").config();
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const sharp = require("sharp");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const PORT = 8080;

// CORS Middleware
app.use(cors());
app.use(express.json());

// Load API Key from .env file
const GENAI_API_KEY = process.env.GENAI_API_KEY;
if (!GENAI_API_KEY) {
  throw new Error("Google Gemini API key is missing in .env file");
}

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(GENAI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post("/Analyze", upload.single("file"), async (req, res) => {
  try {
    const { age, health } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Convert image to base64
    const imageBuffer = await sharp(req.file.buffer)
      .resize(800) // Resize to reduce processing load
      .toFormat("jpeg")
      .toBuffer();
    const imageBase64 = imageBuffer.toString("base64");

    // Gemini prompt for text extraction
    const extractionPrompt = `Extract all visible text from the image, specifically focusing on:
- Ingredients and their quantities
- Expiry date
- Nutritional values
- Any warnings or health-related information

⚠️ Return only JSON output. Do NOT include any extra text, explanations, or formatting.

Example JSON format:
{
  "product_name": "Example Food",
  "net_weight": "100g",
  "nutrition_info": {
    "Energy": "200 kcal",
    "Protein": "5g",
    "Carbohydrates": "30g",
    "Total Fat": "10g",
    "Sodium": "500mg"
  },
  "ingredients": ["Wheat flour", "Sugar", "Salt"],
  "expiry_date": "Best before 12 months from manufacture",
  "warnings": ["Contains gluten", "High sodium content"]
}`;

    // Call Gemini API
    const extractedData = await model.generateContent([
      { inlineData: { mimeType: "image/jpeg", data: imageBase64 } },
      extractionPrompt,
    ]);

    const extractedText = extractedData.response.candidates[0].content.parts[0].text;
    console.log("🔍 Extracted Text from Gemini API:", extractedText);

    let extractedInfo;
    try {
      // Extract JSON content using regex
      const jsonMatch = extractedText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("No valid JSON found in the response");

      extractedInfo = JSON.parse(jsonMatch[0]); // Parse JSON
    } catch (error) {
      console.error("🚨 Error parsing extracted data:", error);
      return res.status(500).json({ error: "Failed to parse extracted data" });
    }

    // Generate recommendation based on age and health
    const recommendationPrompt = `Based on the extracted details, the user is a ${age}-year-old ${health} patient.
Tell us whether the product is suitable for the user. Here are the product details: ${JSON.stringify(extractedInfo)}.
Provide JSON output with keys: 'recommendation' (values: 'safe', 'moderate', 'unsafe') and 'reason' (explanation).`;

    const recommendationResponse = await model.generateContent(recommendationPrompt);
    const recommendationText = recommendationResponse.response.candidates[0].content.parts[0].text;
    console.log("🔍 Recommendation Text from Gemini API:", recommendationText);

    let recommendation;
    try {
      // Extract JSON content using regex
      const jsonMatch = recommendationText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("No valid JSON found in recommendation response");

      recommendation = JSON.parse(jsonMatch[0]);
    } catch (error) {
      console.error("🚨 Error parsing recommendation data:", error);
      return res.status(500).json({ error: "Failed to parse recommendation response" });
    }

    res.json({
      extracted_info: extractedInfo,
      recommendation,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
