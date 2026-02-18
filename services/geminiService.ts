
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => {
  const customKey = localStorage.getItem('custom_gemini_key');
  const apiKey = customKey || process.env.API_KEY;
  if (!apiKey) {
    console.error("Cloud AI: API Key missing in environment.");
  }
  return new GoogleGenAI({ apiKey: apiKey as string });
};

/**
 * Robust JSON cleaner to handle markdown-wrapped responses
 */
const parseCloudJSON = (text: string) => {
  try {
    const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(cleaned);
  } catch (e) {
    console.error("Cloud AI: JSON Parse Failure", e);
    return {};
  }
};

/**
 * Optimized Cloud Execution with automatic cluster switching
 */
async function cloudExecute(params: any) {
  const ai = getAI();
  const hasCustomKey = !!localStorage.getItem('custom_gemini_key');
  
  // Use Flash by default for maximum compatibility, Pro only if custom key exists or as fallback
  const primaryModel = hasCustomKey ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview';
  
  try {
    return await ai.models.generateContent({
      ...params,
      model: primaryModel
    });
  } catch (error: any) {
    const errorStr = JSON.stringify(error).toLowerCase();
    if (errorStr.includes("403") || errorStr.includes("permission") || errorStr.includes("not found")) {
      console.warn("Cloud AI: Switching to High-Availability Flash Cluster...");
      return await ai.models.generateContent({
        ...params,
        model: 'gemini-3-flash-preview'
      });
    }
    throw error;
  }
}

export const generateSEO = async (topic: string) => {
  const response = await cloudExecute({
    contents: `As a Master Cloud AI SEO Expert, generate a full high-end SEO package for a YouTube video about: "${topic}". 
    1. Provide 15 highly optimized long-tail tags.
    2. Provide 10 viral trending hashtags.
    3. Calculate a precise algorithmic difficulty score (1-100).
    4. List 5 high-level growth strategies.
    Return JSON only.`,
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
    contents: `Generate 10 high-CTR viral YouTube titles for "${topic}". Return as JSON array of strings.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: { type: Type.ARRAY, items: { type: Type.STRING } }
    }
  });
  return parseCloudJSON(response.text || '[]');
};

export const generateScript = async (topic: string, format: string) => {
  const response = await cloudExecute({
    contents: `Write a high-retention script for a YouTube ${format} about: "${topic}". Format as JSON.`,
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
    contents: `Generate 20 trending hashtags for: "${topic}". Return as JSON array of strings.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: { type: Type.ARRAY, items: { type: Type.STRING } }
    }
  });
  return parseCloudJSON(response.text || '[]');
};

export const generateChannelNames = async (niche: string) => {
  const response = await cloudExecute({
    contents: `Suggest 15 creative channel names for: "${niche}". Return JSON array.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: { type: Type.ARRAY, items: { type: Type.STRING } }
    }
  });
  return parseCloudJSON(response.text || '[]');
};

export const findCompetitors = async (topic: string) => {
  const response = await cloudExecute({
    contents: `Map competitive landscape for: "${topic}". Return JSON.`,
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
    contents: `Generate 10 opening hooks for: "${topic}". Return as JSON array.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: { type: Type.ARRAY, items: { type: Type.STRING } }
    }
  });
  return parseCloudJSON(response.text || '[]');
};

export const generateGrowthIdeas = async (niche: string) => {
  const response = await cloudExecute({
    contents: `Predict 10 unique viral video ideas for "${niche}". Return JSON.`,
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
    contents: `Analyze YouTube niche: "${niche}". Provide Competition, CPM, and Roadmap. Return JSON.`,
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
    contents: `Generate 5 visual concepts for thumbnails about: "${topic}". Return JSON.`,
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
