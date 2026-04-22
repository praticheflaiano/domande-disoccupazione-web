import { GoogleGenerativeAI } from "@google/generative-ai";

const MODEL_ID = "gemini-1.5-flash";

export const getGeminiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error("Missing GEMINI_API_KEY environment variable (configure it in Vercel project settings).");
    }
    return new GoogleGenerativeAI(apiKey);
};

export const getModel = (systemInstruction?: string) => {
    const genAI = getGeminiClient();
    return genAI.getGenerativeModel(systemInstruction ? { model: MODEL_ID, systemInstruction } : { model: MODEL_ID });
};
