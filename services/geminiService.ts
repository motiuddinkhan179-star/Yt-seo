
import { GoogleGenAI, Type } from "@google/genai";

/**
 * Technical implementation of the Cloud Engine.
 * Must instantiate inside functions to capture user-selected API Keys.
 */
const getAI = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY as string });
};

/**
 * Cleans markdown formatting from AI responses for stable JSON parsing.
 */
const parseCloudJSON = (text: string) => {
  try {
    const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(cleaned);
  } catch (e) {
    console.error("Cloud AI: JSON Corruption Detected", e);
    return {};
  }
};

/**
 * Master Execution Cluster with Automatic Fallback.
 * Ensures tools don't fail if one model tier is restricted.
 */
async function cloudExecute(params: any) {
  const ai = getAI();
  
  try {
    // Attempt Pro Cluster (Master reasoning)
    return await ai.models.generateContent({
      ...params,
      model: 'gemini-3-pro-preview'
    });
  } catch (error: any) {
    console.warn("Pro Cluster rejected. Diverting to high-speed Flash Cluster...");
    try {
      return await ai.models.generateContent({
        ...params,
        model: 'gemini-3-flash-preview'
      });
    } catch (innerError: any) {
      console.error("Critical Neural Link Failure", innerError);
      throw innerError;
    }
  }
}

export const generateSEO = async (topic: string) => {
  const response = await cloudExecute({
    contents: `YouTube SEO Optimization for: "${topic}". Return JSON: tags (array), hashtags (array), score (number), suggestions (array).`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          tags: { type: Type.ARRAY, items: { type: Type.STRING } },
          hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
          score: { type: Type.NUMBER },
          suggestions: { type: Type.ARRAY, items: { type: Type.STRING } }
        }
      }
    }
  });
  return parseCloudJSON(response.text || '{}');
};

export const generateTitles = async (topic: string) => {
  const response = await cloudExecute({
    contents: `Generate 10 viral YouTube titles for "${topic}". Return JSON array.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: { type: Type.ARRAY, items: { type: Type.STRING } }
    }
  });
  return parseCloudJSON(response.text || '[]');
};

export const generateScript = async (topic: string, format: string) => {
  const response = await cloudExecute({
    contents: `Full Retention Script for YouTube ${format} about: "${topic}". Return JSON: hook, script, outline.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          hook: { type: Type.STRING },
          script: { type: Type.STRING },
          outline: { type: Type.STRING }
        }
      }
    }
  });
  return parseCloudJSON(response.text || '{}');
};

export const generateHashtags = async (topic: string) => {
  const response = await cloudExecute({
    contents: `20 viral hashtags for: "${topic}". Return JSON array.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: { type: Type.ARRAY, items: { type: Type.STRING } }
    }
  });
  return parseCloudJSON(response.text || '[]');
};

export const generateChannelNames = async (niche: string) => {
  const response = await cloudExecute({
    contents: `15 branding ideas for: "${niche}". Return JSON array.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: { type: Type.ARRAY, items: { type: Type.STRING } }
    }
  });
  return parseCloudJSON(response.text || '[]');
};

export const findCompetitors = async (topic: string) => {
  const response = await cloudExecute({
    contents: `Market Analysis for: "${topic}". Return JSON array of objects: competitorType, strength, opportunity.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            competitorType: { type: Type.STRING },
            strength: { type: Type.STRING },
            opportunity: { type: Type.STRING }
          }
        }
      }
    }
  });
  return parseCloudJSON(response.text || '[]');
};

export const generateHooks = async (topic: string) => {
  const response = await cloudExecute({
    contents: `10 viral video hooks for: "${topic}". Return JSON array.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: { type: Type.ARRAY, items: { type: Type.STRING } }
    }
  });
  return parseCloudJSON(response.text || '[]');
};

export const generateGrowthIdeas = async (niche: string) => {
  const response = await cloudExecute({
    contents: `10 viral video concepts for niche: "${niche}". Return JSON array: title, viralScore, concept.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            viralScore: { type: Type.NUMBER },
            concept: { type: Type.STRING }
          }
        }
      }
    }
  });
  return parseCloudJSON(response.text || '[]');
};

export const analyzeNiche = async (niche: string) => {
  const response = await cloudExecute({
    contents: `Deep Niche Analysis: "${niche}". Return JSON: competition, avgCpm, strategies (array).`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          competition: { type: Type.STRING },
          avgCpm: { type: Type.STRING },
          strategies: { type: Type.ARRAY, items: { type: Type.STRING } }
        }
      }
    }
  });
  return parseCloudJSON(response.text || '{}');
};

export const generateThumbnailConcepts = async (topic: string) => {
  const response = await cloudExecute({
    contents: `5 visual concepts for thumbnails: "${topic}". Return JSON array: concept, elements, colors.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            concept: { type: Type.STRING },
            elements: { type: Type.STRING },
            colors: { type: Type.STRING }
          }
        }
      }
    }
  });
  return parseCloudJSON(response.text || '[]');
};
