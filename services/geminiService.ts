
import { GoogleGenAI, Type } from "@google/genai";

// Create a new GoogleGenAI instance right before making an API call to ensure it always uses the most up-to-date API key.
export async function enhanceText(prompt: string): Promise<string> {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `بصفتك كاتب محتوى إبداعي ومختص في صياغة السير الذاتية المهنية باللغة العربية، قم بتحسين النص التالي ليصبح أكثر احترافية وجاذبية مع الحفاظ على المعنى الأصلي. النص: "${prompt}"`,
    });
    return response.text || prompt;
  } catch (error) {
    console.error("Gemini Error:", error);
    return prompt;
  }
}

export async function generateContentSuggestions(topic: string) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `اقترح 3 نقاط مهنية قوية لسيرة ذاتية في مجال: ${topic}. أريدها بصيغة نقاط مختصرة واحترافية باللغة العربية.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });
    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error("Gemini Error:", error);
    return [];
  }
}
