import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

// ✅ Fix: Use an async function to start chat properly
export const AIChatSession = async (message) => {
    try {
        const chat = model.startChat({ generationConfig, history: [] });
        const result = await chat.sendMessage(message);
        return result.response.text(); // Get AI response text
    } catch (error) {
        console.error("AI API Error:", error);
        return "Failed to generate response.";
    }
};