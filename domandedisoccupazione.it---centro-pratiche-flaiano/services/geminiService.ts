import { GoogleGenAI, Type } from "@google/genai";
import { ExtractedData, CalculatorMode } from "../types";

export const analyzeContributionDocument = async (
  base64Data: string,
  mimeType: string,
  mode: CalculatorMode
): Promise<ExtractedData> => {
  try {
    // 1. Initialize Gemini with strict process.env.API_KEY usage
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const today = new Date().toISOString().split('T')[0];
    const fourYearsAgo = new Date();
    fourYearsAgo.setFullYear(fourYearsAgo.getFullYear() - 4);
    const dateLimit = fourYearsAgo.toISOString().split('T')[0];
    
    // 2. Handle Content Type (XML/Text vs Binary PDF/Image)
    const isTextBased = mimeType.includes('xml') || mimeType.includes('text') || mimeType.includes('json');
    
    let parts: any[] = [];
    
    if (isTextBased) {
        try {
            const decodedText = atob(base64Data);
            parts.push({ text: `DOCUMENTO DA ANALIZZARE (XML/TESTO):\n\n${decodedText}` });
        } catch (e) {
            console.warn("Base64 decode failed for text content, sending raw.", e);
            parts.push({ text: `DOCUMENTO DA ANALIZZARE (RAW):\n\n${base64Data}` });
        }
    } else {
        // PDF or Image -> Inline Data
        parts.push({ inlineData: { mimeType: mimeType, data: base64Data } });
    }

    let prompt = "";
    let schemaProperties = {};
    let requiredFields: string[] = [];

    // 3. Define Prompts based on mode
    if (mode === 'forecast') {
      prompt = `
        Sei un analista esperto INPS. Analizza il documento fornito (Estratto Contributivo, UNIEMENS xml, o Busta Paga).
        
        DATA ODIERNA: ${today}
        PERIODO DI INTERESSE: Dal ${dateLimit} ad oggi.

        ISTRUZIONI:
        1. Individua tutti i periodi lavorativi/contributivi presenti nel documento.
        2. Filtra SOLO i periodi che rientrano (anche parzialmente) negli ULTIMI 4 ANNI.
        3. Calcola la somma delle SETTIMANE ("weeks") utili per la disoccupazione in questo periodo.
           - Se un periodo è parzialmente fuori, calcola pro-rata.
           - Cerca colonne come "Settimane", "Sett.", "Weeks", "Uniemens".
        4. Calcola la somma dell'IMPONIBILE PREVIDENZIALE ("wages") in questo periodo.
           - Cerca colonne come "Imponibile", "Retribuzione", "Lordo".
        
        IMPORTANTE: Restituisci numeri puri. Se il dato non è presente, stima 0.
      `;
      schemaProperties = {
        weeks: { type: Type.NUMBER, description: "Totale settimane contributive ultimi 4 anni" },
        wages: { type: Type.NUMBER, description: "Totale imponibile previdenziale ultimi 4 anni" },
      };
      requiredFields = ["weeks", "wages"];
    } else {
      prompt = `
        Sei un analista INPS esperto. Analizza il documento fornito (Lettera Accoglimento NASpI o Prospetto).
        Estrai i dati del provvedimento APPROVATO:
        1. "startDate": Data inizio NASpI (Formato YYYY-MM-DD).
        2. "days": Giorni totali di durata spettante.
        3. "monthlyAmount": Importo lordo mensile medio/iniziale.
      `;
      schemaProperties = {
        startDate: { type: Type.STRING, description: "Data decorrenza (YYYY-MM-DD)" },
        days: { type: Type.NUMBER, description: "Giorni durata" },
        monthlyAmount: { type: Type.NUMBER, description: "Importo mensile lordo" },
      };
      requiredFields = ["days", "monthlyAmount"];
    }
    
    // Add prompt text first
    parts.unshift({ text: prompt });

    // 4. Call Gemini API
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: { parts },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: schemaProperties,
          required: requiredFields,
        },
      },
    });

    // 5. Parse Response safely
    const rawText = response.text || "{}";
    const cleanText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const data = JSON.parse(cleanText) as ExtractedData;
    console.log("Gemini Analysis Result:", data);
    return data;

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    // Return empty/zero data instead of crashing
    return { weeks: 0, wages: 0, days: 0, monthlyAmount: 0 };
  }
};