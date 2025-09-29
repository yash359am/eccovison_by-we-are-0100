import { GoogleGenAI, Type } from "@google/genai";
import { ClassificationResult } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const dataUrlToGenerativePart = (dataUrl: string) => {
    const [header, data] = dataUrl.split(',');
    if (!header || !data) {
        throw new Error("Invalid data URL format");
    }
    const mimeType = header.match(/:(.*?);/)?.[1] || 'image/jpeg';
    return {
        inlineData: { data, mimeType },
    };
};

export const classifyWaste = async (imageDataUrl: string): Promise<ClassificationResult> => {
    try {
        const imagePart = dataUrlToGenerativePart(imageDataUrl);

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: {
                parts: [
                    imagePart,
                    { text: 'Analyze this image and classify the primary waste item. Provide the classification and a brief, one-sentence reason.' }
                ]
            },
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        classification: {
                            type: Type.STRING,
                            description: 'The waste classification. Must be one of: "Recyclable", "Non-Recyclable", or "Compostable".',
                            enum: ['Recyclable', 'Non-Recyclable', 'Compostable']
                        },
                        reason: {
                            type: Type.STRING,
                            description: 'A brief, one-sentence explanation for the classification.'
                        }
                    },
                    required: ['classification', 'reason']
                }
            }
        });

        const jsonString = response.text;
        const result = JSON.parse(jsonString) as ClassificationResult;
        return result;

    } catch (error) {
        console.error("Error classifying waste:", error);
        throw new Error("Failed to classify the image. The AI model may be unable to process this request. Please try again with a different image.");
    }
};