import type { Effect } from './types';

export const EFFECTS: Effect[] = [
  {
    id: 'vintage',
    name: '复古风格',
    description: '旧时光的温暖色调',
    prompt: 'Apply a vintage photo effect with a warm, sepia tone, slightly faded colors, and subtle grain. Make it look like an old, classic photograph from the 1970s.',
  },
  {
    id: 'b&w',
    name: '黑白经典',
    description: '高对比度的艺术感',
    prompt: 'Convert this photo to a high-contrast black and white image. Emphasize the light and shadows to create a dramatic, artistic effect.',
  },
  {
    id: 'portrait',
    name: '人像模式',
    description: '主体锐化，背景虚化',
    prompt: 'Apply a portrait mode effect. Sharpen the main subject and apply a subtle, natural-looking blur to the background to create depth of field.'
  },
  {
    id: 'golden-hour',
    name: '黄金时刻',
    description: '梦幻般的温暖光线',
    prompt: 'Apply a golden hour effect. Bathe the image in a soft, warm, glowing light, enhance the warm tones like yellows and oranges, and create long, soft shadows for a dreamy and magical atmosphere.',
  },
  {
    id: 'cinematic-teal-orange',
    name: '电影色调',
    description: '青色与橙色的碰撞',
    prompt: 'Apply a cinematic teal and orange color grade. Shift the highlights and midtones towards teal and cyan, while pushing the shadows and skin tones towards warm orange and red. Increase the overall contrast for a modern, blockbuster movie look.',
  },
  {
    id: 'long-exposure',
    name: '长曝光',
    description: '丝滑水流与光轨',
    prompt: "Simulate a long exposure effect. If there is moving water, make it look silky and smooth. If it's a night scene with lights, create motion blur and light trails from moving objects. Keep stationary objects sharp.",
  },
  {
    id: 'lomo',
    name: 'LOMO相机',
    description: '高饱和度与暗角',
    prompt: 'Create a Lomo effect. Drastically increase color saturation and contrast, add a heavy, dark vignette around the edges, and introduce a slight color shift to give it a toy camera, cross-processed film look.',
  },
  {
    id: 'pop-art',
    name: '波普艺术',
    description: '安迪·沃霍尔风格',
    prompt: "Transform this photo into a vibrant, colorful pop art style, similar to Andy Warhol's work. Use bold, contrasting colors and a screen-printed look.",
  },
  {
    id: 'watercolor',
    name: '水彩画',
    description: '轻盈通透的笔触',
    prompt: 'Make this photo look like a watercolor painting. Use soft, blended colors, visible brush strokes, and a textured paper background.',
  },
  {
    id: 'sketch',
    name: '铅笔素描',
    description: '细腻的线条描绘',
    prompt: 'Convert this photo into a detailed pencil sketch. It should look hand-drawn, with clear outlines, shading, and cross-hatching for texture.',
  },
  {
    id: 'manga',
    name: '漫画风格',
    description: '日式黑白漫画感',
    prompt: "Transform this photo into a dramatic Japanese manga style. Use high-contrast black and white, apply screentone patterns for shading and texture, and emphasize dynamic action lines. The result should look like a page from a professionally drawn manga.",
  },
  {
    id: 'cyberpunk',
    name: '赛博朋克',
    description: '霓虹灯下的未来都市',
    prompt: 'Give this photo a futuristic, cyberpunk aesthetic. Add vibrant neon lights, especially in blues and pinks, a dark, moody atmosphere with deep shadows, and a cinematic feel.',
  },
  {
    id: 'eye-of-cosmos',
    name: '星辰之眼',
    description: '史诗级星空增强',
    prompt: 'Transform this photo into an epic, high-resolution astrophotography masterpiece. Make the stars pinpoint sharp and brilliantly bright. Drastically enhance the vibrant colors and intricate details of any nebulae or galaxies. Push the background sky to a deep, inky black to create maximum contrast and a profound sense of depth, similar to an image from a deep space telescope.',
  },
  {
    id: 'star-trails',
    name: '星轨之舞',
    description: '捕捉地球的旋转',
    prompt: "Simulate a long-exposure star trail photograph. Transform the stars in the sky into mesmerizing circular light trails, as if capturing the Earth's rotation over a long period. Keep the foreground landscape and any stationary objects sharp and clear.",
  },
  {
    id: 'aurora-dream',
    name: '梦幻极光',
    description: '为夜空增添绚丽光彩',
    prompt: 'Add a beautiful, ethereal aurora borealis (northern lights) effect to the sky in this photo. The aurora should have flowing ribbons of green and magenta light, look natural within the scene, and reflect realistically on any water or landscape elements present.',
  },
  {
    id: 'intelligent-merge',
    name: '智能场景融合',
    description: 'AI分析并逻辑性地合成新照片',
    prompt: 'You are an expert photo editor. Analyze the content of all provided images. Your task is to create a single, new, photorealistic photograph that logically and seamlessly merges the subjects and environments from all images. Do not create a collage or a simple blend. Instead, intelligently integrate the elements into a single, coherent scene, ensuring consistent lighting, shadows, and perspective. For example, if given an image of a person and an image of a landmark, place the person realistically in front of the landmark. The final output must be one believable photo.',
    multiImage: true,
  },
  {
    id: 'seamless-blend',
    name: '艺术化融合',
    description: '超现实双重曝光',
    prompt: 'Create a seamless, artistic double exposure effect by blending the provided images into a single, cohesive work of art. Intelligently merge the key elements from each photo, such as blending a portrait with a landscape, or combining two scenes into a surreal, dreamlike image. The final result should be a single, beautiful image where the boundaries between the original photos are invisible and artistically integrated.',
    multiImage: true,
  },
  {
    id: 'scrapbook-collage',
    name: '手帐风拼贴',
    description: '宝丽来与和纸胶带',
    prompt: "Create a charming digital scrapbook page from the provided images. Transform each image into a slightly tilted Polaroid-style print with a white border. Arrange them in a casual, overlapping layout. Add subtle, realistic details like small pieces of washi tape holding the corners of some photos. The background should be a simple, textured paper look.",
    multiImage: true,
  },
  {
    id: 'photo-booth-strip',
    name: '复古大头贴',
    description: '经典的竖向连拍',
    prompt: "Arrange the provided images sequentially in a vertical photo booth strip format. Each image should occupy its own frame within the strip. Give the strip a classic, high-contrast look, either in black and white or with slightly faded, vintage colors. The final output must be a single, tall, vertical image that looks like a real photo booth print.",
    multiImage: true,
  },
];
