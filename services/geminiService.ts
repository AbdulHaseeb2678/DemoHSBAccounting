import { GoogleGenAI } from "@google/genai";

// Initialize Gemini Client
// IMPORTANT: In a real environment, ensure process.env.API_KEY is set.
// This code assumes the key is available globally via the build system or environment.
const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
You are "HSB Assistant", a helpful, professional, and concise AI assistant for HSB Accounting & Finance. 
Your goal is to answer basic accounting, tax, and financial questions for potential clients.

IMPORTANT:
- If the user asks to book a meeting, call, or consultation, ALWAYS provide this link: https://calendly.com/abdulhbwork/30min
- Keep answers brief (under 100 words) and easy to understand.
- Do not give specific legal or binding financial advice; always suggest booking a consultation for specific cases.
- Tone: Professional, trustworthy, warm.
- If asked about services, mention: Tax Preparation, Bookkeeping, Payroll, and Financial Consulting.
`;

export const streamResponse = async (
  message: string, 
  onChunk: (text: string) => void
): Promise<void> => {
  if (!apiKey) {
    onChunk("I'm sorry, I cannot connect to the server right now. Please contact the office directly or book a call at https://calendly.com/abdulhbwork/30min");
    return;
  }

  try {
    const model = 'gemini-2.5-flash';
    const responseStream = await ai.models.generateContentStream({
      model: model,
      contents: [{ role: 'user', parts: [{ text: message }] }],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    for await (const chunk of responseStream) {
      if (chunk.text) {
        onChunk(chunk.text);
      }
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Unable to fetch response.");
  }
};