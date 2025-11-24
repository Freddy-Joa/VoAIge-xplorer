import { GoogleGenAI, Type } from "@google/genai";
import { TripRequest, Itinerary, LogisticsData } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_NAME = 'gemini-2.5-flash';

export const generateItinerary = async (request: TripRequest): Promise<Itinerary | null> => {
  const prompt = `
    You are an expert travel planner. Create a detailed visual itinerary for a trip to ${request.destination}.
    
    Trip Details:
    - Origin: ${request.origin}
    - Dates: ${request.dates}
    - Budget: ${request.budget}
    - Travelers: ${request.travelers}
    - Interests: ${request.interests}

    Requirements:
    1. Provide a day-by-day breakdown.
    2. Suggest a SPECIFIC real-world Hotel/Accommodation.
    3. Suggest the best mode of transport.
    4. Suggest a SPECIFIC signature local dish to try.
    5. For every item, provide a short 'imagePrompt' that describes what it looks like (e.g. "Modern japanese hotel room with city view", "Plate of Pad Thai with peanuts").
    
    Return JSON strictly matching the schema.
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            destination: { type: Type.STRING },
            summary: { type: Type.STRING },
            accommodation: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING },
                    description: { type: Type.STRING },
                    priceRange: { type: Type.STRING },
                    imagePrompt: { type: Type.STRING }
                }
            },
            transport: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING },
                    description: { type: Type.STRING },
                    priceRange: { type: Type.STRING },
                    imagePrompt: { type: Type.STRING }
                }
            },
            localDish: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING },
                    description: { type: Type.STRING },
                    priceRange: { type: Type.STRING },
                    imagePrompt: { type: Type.STRING }
                }
            },
            days: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  day: { type: Type.INTEGER },
                  theme: { type: Type.STRING },
                  activities: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        time: { type: Type.STRING },
                        title: { type: Type.STRING },
                        description: { type: Type.STRING },
                        type: { type: Type.STRING, enum: ['food', 'sightseeing', 'transport', 'relax'] },
                        location: { type: Type.STRING },
                        imagePrompt: { type: Type.STRING }
                      },
                      required: ["time", "title", "description", "type", "imagePrompt"]
                    }
                  }
                },
                required: ["day", "theme", "activities"]
              }
            }
          },
          required: ["destination", "summary", "days", "accommodation", "transport", "localDish"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as Itinerary;
    }
  } catch (e) {
    console.error("Itinerary Generation Failed", e);
  }
  return null;
};

export const getLogisticsInfo = async (origin: string, destination: string): Promise<LogisticsData> => {
  const prompt = `
    I am traveling from ${origin} to ${destination}.
    Using Google Search, find the most up-to-date information on:
    1. Visa requirements and process.
    2. Passport validity rules.
    3. Important local laws and customs.
    4. Currency and tipping.
    
    Format the output as Markdown.
  `;

  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: prompt,
    config: {
      tools: [{ googleSearch: {} }],
    }
  });

  // Extract sources if available
  const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  const sources = chunks
    .map((chunk: any) => chunk.web ? { title: chunk.web.title, uri: chunk.web.uri } : null)
    .filter((s: any) => s !== null);

  return {
      markdown: response.text || "Could not retrieve logistics information.",
      sources: sources as { title: string; uri: string }[]
  };
};

export const translateText = async (text: string, destination: string): Promise<string> => {
  const prompt = `
    Translate the phrase "${text}" into the primary language spoken in ${destination}.
    Provide the output in JSON format with:
    - original
    - translated
    - pronunciation (phonetic guide)
  `;

  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          original: { type: Type.STRING },
          translated: { type: Type.STRING },
          pronunciation: { type: Type.STRING }
        }
      }
    }
  });

  return response.text || "{}";
};