import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_INSTRUCTION = `
Sei l'Assistente Virtuale del "Centro Pratiche Flaiano" (domandedisoccupazione.it).
INFO UFFICIO: Via Filoteo Alberini, 25/int 10, 00139 Roma (RM). Lun-Gio 9:30-13/15:30-18, Ven 9:30-14. Tel 06 9784 5429.
SERVIZI: Calcolo NASpI, Anticipo P.IVA, Domanda Online.
REGOLE: Usa il grassetto per parole chiave. Se non sai rispondere, fornisci il link: https://wa.me/393716230690.
`;

export interface ChatMessage { role: 'user' | 'model'; text: string; }

export const sendChatMessage = async (history: ChatMessage[], newMessage: string): Promise<string> => {
    try {
        // @ts-ignore
        const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: SYSTEM_INSTRUCTION
        });

        const formattedHistory = history.map(msg => ({ role: msg.role, parts: [{ text: msg.text }] }));

        const chat = model.startChat({
            history: formattedHistory
        });

        const result = await chat.sendMessage(newMessage);
        return result.response.text() || "Errore. Riprova.";
    } catch (error) {
        console.error(error);
        return "Errore momentaneo. [Scrivici su WhatsApp](https://wa.me/393716230690)";
    }
};
