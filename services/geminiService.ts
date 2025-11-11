// services/geminiService.ts

import { GoogleGenAI, Modality, Type } from "@google/genai";
import type { Effect } from '../types';

// 通过声明全局类型，让 TypeScript 知道我们通过 preload.js 注入的 API
// 设置为可选，以便在Web环境中不会报错
declare global {
  interface Window {
    electronAPI?: {
      getApiKey: () => Promise<string>;
    };
  }
}

// 使用一个变量来持有 AI 客户端的单例
let ai: GoogleGenAI | null = null;

/**
 * 以兼容Web和Electron的方式获取API密钥。
 */
async function getApiKey(): Promise<string> {
  // 优先检查Electron环境
  if (window.electronAPI?.getApiKey) {
    console.log("正在 Electron 环境中运行，通过 IPC 获取密钥。");
    const key = await window.electronAPI.getApiKey();
    if (!key) throw new Error("未能从主进程获取 API 密钥。");
    return key;
  }

  // 回退到Web环境，从环境变量中获取
  console.log("正在 Web 环境中运行，从 process.env.API_KEY 获取密钥。");
  const key = process.env.API_KEY;
  if (!key) {
    throw new Error("API_KEY 未定义。在Web环境中，必须通过环境变量提供。");
  }
  return key;
}

/**
 * 异步初始化 GoogleGenAI 客户端。
 * 它会根据当前环境从正确的源获取 API 密钥。
 */
async function initializeAiClient() {
  if (ai) {
    return; // 如果已经初始化，则直接返回
  }

  try {
    const apiKey = await getApiKey();
    ai = new GoogleGenAI({ apiKey });
  } catch (error) {
    console.error("初始化AI客户端失败:", error);
    // 重新抛出错误，以便调用函数可以捕获它并更新UI
    throw error;
  }
}

export async function applyPhotoEffect(images: { data: string, mimeType: string }[], prompt: string): Promise<string | null> {
  try {
    // 在第一次调用时确保 AI 客户端已经初始化
    if (!ai) {
      await initializeAiClient();
    }
    // 此时 ai 应该已经被初始化，除非上面的函数抛出错误
    if (!ai) {
       throw new Error("AI 客户端未能初始化。");
    }

    const imageParts = images.map(image => ({
      inlineData: {
        data: image.data,
        mimeType: image.mimeType,
      },
    }));

    // “专业级摄影重制协议”：以佳能5D4等专业全画幅相机为基准，追求极致的摄影真实感和画质。
    const masterInstructions = `
--- PRO-GRADE PHOTOGRAPHIC REMASTERING PROTOCOL ---
You are a world-class professional photographer and retoucher. Your task is to remaster the provided photograph to emulate the quality of a top-tier professional full-frame DSLR camera, such as a Canon 5D Mark IV, paired with a premium L-series lens. The final result must be of the highest photographic fidelity.

These are your NON-NEGOTIABLE CORE DIRECTIVES:
1.  **PREMIUM LENS & SENSOR EMULATION:** The final image must exhibit tack-sharp clarity and edge-to-edge sharpness, characteristic of a high-end prime lens. All details must be rendered with extreme precision.
2.  **FULL-FRAME DYNAMIC RANGE:** You must produce an image with an incredibly wide dynamic range. Recover all possible details from the brightest highlights and the deepest shadows without any clipping (pure white or pure black areas).
3.  **PROFESSIONAL COLOR SCIENCE:** The color reproduction must be rich, vibrant, yet utterly natural. Emulate professional camera color science, ensuring lifelike skin tones and accurate, pleasing hues throughout the image.
4.  **ABSOLUTE ZERO NOISE/ARTIFACTS:** The final image must be pristine and completely free of digital noise, compression artifacts, or color banding, as if it were shot at the camera's base ISO (e.g., ISO 100).
5.  **PRESERVE AUTHENTICITY:** This is a *photographic enhancement*, not a stylistic filter application. The goal is ultimate realism and fidelity. Do not add artificial grain, heavy vignettes, or dramatic color grading unless the user's effect prompt explicitly and specifically demands it.
6.  **EDIT, DO NOT REPLACE:** You must perform a non-destructive remaster *on the original image's data*. Preserve the original composition, subjects, and lighting. Enhance, do not hallucinate a new image.
7.  **TEXT INTEGRITY:** If the original photo contains any legible text, you MUST preserve it perfectly. It must remain 100% sharp and readable.

Now, execute the following specific effect with the precision of a master photographer, adhering to all directives above:

Effect to apply: "${prompt}"
`;
    const finalPrompt = masterInstructions;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: [{ // 修复：将 contents 包装在数组中，以符合模型期望的格式
        parts: [
          // 对于图片编辑任务，最佳实践是先提供图片，再提供操作指令。
          ...imageParts,
          {
            text: finalPrompt,
          },
        ],
      }],
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts ?? []) {
      if (part.inlineData) {
        return part.inlineData.data;
      }
    }

    // 如果没有返回图片，检查阻塞原因并提供更清晰的错误反馈。
    const blockReason = response.promptFeedback?.blockReason;
    if (blockReason) {
      const reasonMessage = `请求因安全原因被阻止: ${blockReason}`;
      console.error(reasonMessage);
      throw new Error(reasonMessage);
    }
    
    const finishReason = response.candidates?.[0]?.finishReason;
    if (finishReason && finishReason !== 'STOP') {
        const reasonMessage = `图片生成因'${finishReason}'而停止。`;
        console.error(reasonMessage);
        throw new Error(reasonMessage);
    }

    // 如果没有找到其他原因，则为通用后备方案
    return null;

  } catch (error) {
    console.error("使用Gemini处理照片效果时出错:", error);
    let message = "使用 AI 模型处理图片时失败。";
    if (error instanceof Error) {
        if (error.message.includes("API_KEY")) {
             message = "未能获取 API 密钥。请确保您的环境已正确配置。";
        } else if (error.message) {
            // 使用我们新检查中更具体地错误信息
            message = error.message;
        }
    }
    throw new Error(message);
  }
}


export async function generateRandomEffects(baseImage: { data: string, mimeType: string }): Promise<Effect[]> {
  try {
    if (!ai) {
      await initializeAiClient();
    }
    if (!ai) {
      throw new Error("AI 客户端未能初始化。");
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            inlineData: {
              data: baseImage.data,
              mimeType: baseImage.mimeType,
            }
          },
          {
            text: `Analyze this image. Based on its content, invent exactly 3 creative and logical photo effects.
            Provide a short, catchy name in Chinese, a one-line description in Chinese, and a detailed, actionable prompt in English for an AI image model to apply the effect.
            Return the response as a valid JSON array.`,
          },
        ],
      },
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING, description: 'A unique ID for the effect, can be a random string.' },
              name: { type: Type.STRING, description: 'The creative name of the effect in Chinese.' },
              description: { type: Type.STRING, description: 'A short description of the effect in Chinese.' },
              prompt: { type: Type.STRING, description: 'A detailed prompt in English for the AI image model.' },
            },
            required: ['id', 'name', 'description', 'prompt'],
          },
        },
      },
    });

    const jsonText = response.text.trim();
    const effects = JSON.parse(jsonText);
    
    // 确保返回的是一个数组
    if (Array.isArray(effects)) {
      return effects.map(e => ({...e, id: e.id || `random-${Math.random()}`})); // 确保每个效果都有id
    }
    
    return [];

  } catch (error) {
    console.error("使用Gemini生成随机效果时出错:", error);
    let message = "AI生成新效果失败。";
    if (error instanceof Error && error.message) {
      message = error.message;
    }
    throw new Error(message);
  }
}

export async function generateMultiImageSuggestions(images: { data: string, mimeType: string }[]): Promise<Effect[]> {
  try {
    if (!ai) { await initializeAiClient(); }
    if (!ai) { throw new Error("AI 客户端未能初始化。"); }

    const imageParts = images.map(image => ({
      inlineData: {
        data: image.data,
        mimeType: image.mimeType,
      },
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          ...imageParts,
          {
            text: `You are an expert creative director and photo editor. Your task is to analyze the content, style, and subject matter of all provided images. Based on your analysis, propose exactly 3 distinct, creative, and logical ideas for combining them into a single, new image. For each idea, provide a short, catchy name in Chinese, a one-line description in Chinese of the concept, and a detailed, actionable prompt in English for an AI image model to execute the idea. Return the response as a valid JSON array.`,
          },
        ],
      },
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING, description: 'A unique ID for the suggestion, can be a random string.' },
              name: { type: Type.STRING, description: 'The creative name of the suggestion in Chinese.' },
              description: { type: Type.STRING, description: 'A short description of the suggestion in Chinese.' },
              prompt: { type: Type.STRING, description: 'A detailed prompt in English for the AI image model.' },
            },
            required: ['id', 'name', 'description', 'prompt'],
          },
        },
      },
    });
    
    const jsonText = response.text.trim();
    const suggestions = JSON.parse(jsonText);

    if (Array.isArray(suggestions)) {
      return suggestions.map(s => ({...s, id: s.id || `suggestion-${Math.random()}`, multiImage: true }));
    }

    return [];

  } catch (error) {
    console.error("使用Gemini生成多图建议时出错:", error);
    let message = "AI生成智能建议失败。";
    if (error instanceof Error && error.message) {
      message = error.message;
    }
    throw new Error(message);
  }
}

export async function identifyImageContent(image: { data: string, mimeType: string }): Promise<string> {
  try {
    if (!ai) { await initializeAiClient(); }
    if (!ai) { throw new Error("AI 客户端未能初始化。"); }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            inlineData: {
              data: image.data,
              mimeType: image.mimeType,
            }
          },
          {
            text: `你是一位首席视觉分析师。你的核心任务是**首先识别出这张图片中最重要的核心主体**，然后仅针对该主体提供深入、专注的分析。请忽略不重要的背景元素和次要细节。

1.  **识别核心主体**：清晰地指出图片的主角是什么。
2.  **提供深入分析**：根据主体的类型，进行详细说明：
    *   **动植物/昆虫**：识别其物종和通用名，并分享一两个最有趣的知识点。
    *   **人物**：如果为公众人物，请识别其身份。否则，描述其姿态、情绪和衣着风格。
    *   **文字（特别是古文/书法）**：尽可能准确地释读文字内容，并解释其可能的含义、出处或书法风格。
    *   **地标/建筑**：识别其名称、地点，并简述其最著名的特点或历史。
    *   **艺术品**：识别其作者、流派，并解读其主要表现手法或象征意义。
    *   **物体（如汽车、食物等）**：识别其具体类型或名称，并描述其最显著的特征。

你的回答必须聚焦、有条理，用中文写成，并使用 Markdown 格式以增强可读性。`,
          },
        ],
      },
    });

    return response.text;

  } catch (error) {
    console.error("使用Gemini识别图片内容时出错:", error);
    let message = "AI识别图片内容失败。";
    if (error instanceof Error && error.message) {
      message = error.message;
    }
    throw new Error(message);
  }
}