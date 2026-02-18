
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => {
  const customKey = localStorage.getItem('custom_gemini_key');
  const apiKey = customKey || process.env.API_KEY;
  return new GoogleGenAI({ apiKey: apiKey as string });
};

/**
 * Executes a generation request with a robust fallback from Pro to Flash.
 * Specifically handles 403 (Permission Denied) and 429 (Rate Limit) errors.
 */
async function cloudExecute(params: any) {
  const ai = getAI();
  try {
    // Stage 1: Attempt Master Cluster (Pro)
    return await ai.models.generateContent({
      ...params,
      model: 'gemini-3-pro-preview'
    });
  } catch (error: any) {
    const errorStr = JSON.stringify(error).toLowerCase();
    const msg = (error.message || "").toLowerCase();
    
    // Check for Permission Denied, Rate Limits, or Model Not Found
    const isPermissionError = msg.includes("403") || msg.includes("permission") || errorStr.includes("403");
    const isResourceError = msg.includes("404") || msg.includes("not found") || msg.includes("429") || errorStr.includes("429");

    if (isPermissionError || isResourceError) {
      console.warn("Cloud AI: Pro Cluster restricted or busy. Diverting to high-availability Flash Cluster...");
      // Stage 2: Fallback to Flash Cluster
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
    4. List 5 high-level growth strategies using latest platform trends.
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
  return JSON.parse(response.text || '{}');
};

export const generateTitles = async (topic: string) => {
  const response = await cloudExecute({
    contents: `Generate 10 high-CTR, viral YouTube titles for "${topic}". Utilize Cloud AI psychology triggers. Return as a JSON array of strings.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: { type: Type.ARRAY, items: { type: Type.STRING } }
    }
  });
  return JSON.parse(response.text || '[]');
};

export const generateScript = async (topic: string, format: string) => {
  const response = await cloudExecute({
    contents: `Write a high-retention Cloud AI script for a YouTube ${format} about: "${topic}". Focus on narrative structure, retention hacking, and viral CTAs. Format as JSON.`,
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
  return JSON.parse(response.text || '{}');
};

export const generateHashtags = async (topic: string) => {
  const response = await cloudExecute({
    contents: `Analyze trending clusters and generate 20 trending hashtags for: "${topic}". Return as JSON array of strings.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: { type: Type.ARRAY, items: { type: Type.STRING } }
    }
  });
  return JSON.parse(response.text || '[]');
};

export const generateChannelNames = async (niche: string) => {
  const response = await cloudExecute({
    contents: `Suggest 15 creative Cloud-branded YouTube channel names for niche: "${niche}". Return JSON array.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: { type: Type.ARRAY, items: { type: Type.STRING } }
    }
  });
  return JSON.parse(response.text || '[]');
};

export const findCompetitors = async (topic: string) => {
  const response = await cloudExecute({
    contents: `Map out the competitive landscape for: "${topic}". Identify 5 dominant styles. Return JSON.`,
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
  return JSON.parse(response.text || '[]');
};

export const generateHooks = async (topic: string) => {
  const response = await cloudExecute({
    contents: `Generate 10 Cloud AI engineered opening hooks for: "${topic}". Focus on first 3-second retention. Return as a JSON array.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: { type: Type.ARRAY, items: { type: Type.STRING } }
    }
  });
  return JSON.parse(response.text || '[]');
};

export const generateGrowthIdeas = async (niche: string) => {
  const response = await cloudExecute({
    contents: `Cloud AI Niche Analysis: Predict 10 unique, trending video ideas for "${niche}". Return JSON.`,
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
  return JSON.parse(response.text || '[]');
};

export const analyzeNiche = async (niche: string) => {
  const response = await cloudExecute({
    contents: `Analyze the YouTube niche: "${niche}" using Cloud AI metrics. Provide competition level, average CPM, and 3 strategic growth roadmaps. Return JSON.`,
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
  return JSON.parse(response.text || '{}');
};

export const generateThumbnailConcepts = async (topic: string) => {
  const response = await cloudExecute({
    contents: `Generate 5 Cloud AI visual concepts for thumbnails about: "${topic}". Return JSON.`,
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
  return JSON.parse(response.text || '[]');
};
