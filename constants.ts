import type { EffectCategory } from './types';

export const SINGLE_IMAGE_EFFECT_CATEGORIES: EffectCategory[] = [
  {
    name: '经典模拟',
    effects: [
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
        id: 'kodak-film',
        name: '柯达经典胶片',
        description: '传奇胶片的温暖与质感',
        prompt: "Simulate the iconic look of Kodachrome 64 film. The image should have rich, saturated colors, particularly warm reds and yellows, high contrast, and fine, pleasant grain. The overall aesthetic should feel timeless, sharp, and deeply nostalgic, like a perfectly preserved slide from the golden age of photography.",
      },
      {
        id: 'matte',
        name: '哑光电影感',
        description: '低对比度的柔和质感',
        prompt: 'Apply a cinematic matte effect to this photo. Lift the black point so that the darkest shadows are a faded gray instead of pure black. Slightly decrease overall contrast and saturation to create a soft, moody, and film-like aesthetic. The final image should have a dreamy, non-glossy finish.',
      },
      {
        id: 'y2k-digital',
        name: 'Y2K复古数码',
        description: '2000年代初CCD相机的感觉',
        prompt: "Recreate the aesthetic of an early 2000s point-and-shoot digital camera. The image should have a harsh, direct on-camera flash look, leading to slightly blown-out highlights and deep, dark shadows. Colors should be oversaturated, especially reds and blues, and there should be a subtle digital noise or blooming effect characteristic of a CCD sensor. The final result should feel candid, nostalgic, and authentically lo-fi.",
      },
      {
        id: 'lomo',
        name: 'LOMO相机',
        description: '高饱和度与暗角',
        prompt: 'Create a Lomo effect. Drastically increase color saturation and contrast, add a heavy, dark vignette around the edges, and introduce a slight color shift to give it a toy camera, cross-processed film look.',
      },
    ]
  },
  {
    name: '光影艺术',
    effects: [
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
        id: 'orton-soft-focus',
        name: '奥顿柔焦幻境',
        description: '发光的、梦幻般的柔焦效果',
        prompt: "Apply a classic Orton effect to this photo. This is achieved by blending a sharp, detailed version of the image with an overexposed, blurry version. The final result should have a soft, ethereal glow that makes highlights bloom and the overall scene feel dreamlike and painterly, while still retaining underlying detail and texture. It is especially effective for landscapes and portraits to create a serene, magical atmosphere.",
      },
      {
        id: 'neon-sketch',
        name: '霓虹素描',
        description: '发光的定制霓虹招牌',
        prompt: 'Convert the main subject of this photo into a glowing neon sketch. Trace the key outlines of the subject with bright, vibrant neon lines (e.g., pink, blue, cyan). Place the neon sketch against a dark, moody background like a brick wall or a dark cityscape to make the glow pop. The final image should look like a custom neon sign.',
      },
      {
        id: 'light-painting',
        name: '动态光绘',
        description: '用光在空中作画',
        prompt: 'Add a dynamic light painting effect to this image. Weave vibrant, flowing trails of light around the main subject or through the scene. The light trails should look like they were created with a long-exposure photograph, adding a sense of motion and energy. Use a variety of colors for the light trails to create a visually stunning and magical effect.',
      },
    ]
  },
  {
    name: '绘画风格',
    effects: [
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
        id: 'oil-painting',
        name: '油画',
        description: '厚重的笔触与质感',
        prompt: 'Transform this photo into a realistic oil painting. Emphasize visible, textured brushstrokes and a rich, vibrant color palette. The final image should have the tangible feel of a classic canvas painting, with depth and a sense of impasto.',
      },
      {
        id: 'ink-wash',
        name: '水墨画',
        description: '东方的写意神韵',
        prompt: 'Transform this photo into a traditional Chinese ink wash painting (Shui-mo hua). Use only black ink in various tones (from deep black to light gray washes) on a textured rice paper background. The style should be minimalist and expressive, emphasizing flowing brushwork and the spirit (qi) of the subject rather than photorealistic detail. Capture the essence with elegant, simple strokes.',
      },
      {
        id: 'manga',
        name: '漫画风格',
        description: '日式黑白漫画感',
        prompt: "Transform this photo into a dramatic Japanese manga style. Use high-contrast black and white, apply screentone patterns for shading and texture, and emphasize dynamic action lines. The result should look like a page from a professionally drawn manga.",
      },
      {
        id: 'ghibli-style',
        name: '日式彩色漫画风格',
        description: '宫崎骏动画的温暖画风',
        prompt: "Transform this photo into the beautiful and nostalgic art style of a Studio Ghibli film. If the photo contains a person, focus on rendering them with the characteristic Ghibli aesthetic: give them large, expressive eyes, a simplified nose, and soft skin tones. Style their hair with clean lines and gentle, painted-looking highlights. Adapt their clothing to fit the style with simple folds and a soft color palette. For all photos, the overall image should have a soft, painterly quality. Use a vibrant yet gentle color palette with warm, dreamlike lighting that evokes a sense of wonder and whimsy. If there is a background, render it with lush, detailed nature or a cozy, rustic feel. The final result must keep the main subjects recognizable while fully adopting the Ghibli art style.",
      },
      {
        id: 'pop-art',
        name: '波普艺术',
        description: '安迪·沃霍尔风格',
        prompt: "Transform this photo into a vibrant, colorful pop art style, similar to Andy Warhol's work. Use bold, contrasting colors, and a screen-printed look.",
      },
      {
        id: 'duotone',
        name: '双色调海报',
        description: '现代感十足的设计风格',
        prompt: "Convert this photo into a striking duotone image. Remap the darkest tones of the image to a deep navy blue (#000080) and the brightest tones to a vibrant electric lime green (#32CD32). The transition between the two colors should be smooth, creating a bold, modern, graphic design look suitable for a poster or album cover.",
      },
    ]
  },
  {
    name: '国风二次元',
    effects: [
      {
        id: 'xianxia-fantasy',
        name: '仙侠幻境',
        description: '飘逸的水墨笔触与空灵感',
        prompt: 'Transform this photo into a breathtaking "Xianxia" (Immortal Heroes) fantasy art piece. The style should blend traditional Chinese ink wash painting (Shui-mo hua) with modern anime aesthetics. Key elements to include are: flowing, ethereal lines for clothing and hair; a soft, dreamlike color palette with muted tones and occasional bursts of vibrant color for magical effects; and elements of mystical nature, like swirling clouds, ancient mountains, or glowing flora. The overall mood should be elegant, epic, and otherworldly.',
      },
      {
        id: 'cyberpunk-ancient-city',
        name: '赛博古城',
        description: '传统建筑与未来霓虹的碰撞',
        prompt: 'Reimagine this photo in a "Guochao Cyberpunk" style. Fuse traditional Chinese architectural elements (like pagoda roofs, intricate wooden lattices, and guardian lions) with futuristic, high-tech cyberpunk aesthetics. The scene should be drenched in a neon glow, with a color palette dominated by electric blues, vibrant magentas, and golden yellows, contrasted against deep, rainy-night shadows. Add holographic signs featuring Chinese characters, futuristic vehicles, and characters in tech-infused traditional attire. The final image should be a stunning, high-contrast fusion of ancient tradition and a neon-soaked future.',
      },
      {
        id: 'ink-wash-scroll',
        name: '丹青画卷',
        description: '游戏CG般的国风立绘',
        prompt: 'Convert this photo into a stunning "Guofeng" (Chinese Style) character portrait, reminiscent of high-quality video game concept art. The character should have delicate, anime-style facial features but be rendered with the rich textures and brushwork of traditional Chinese painting. Use a sophisticated color palette inspired by mineral pigments like vermilion, malachite green, and azurite blue. The background should be simple and elegant, perhaps a textured scroll or a hint of a classic landscape, to keep the focus on the character. The overall feel should be heroic, refined, and artistically detailed.',
      },
      {
        id: 'cute-mythical-beast',
        name: '萌系神兽',
        description: '将主体变为Q版神兽',
        prompt: 'If the image contains a person or an animal, transform the main subject into an adorable "Q-version" (chibi) Chinese mythical beast. For example, a person could become a cute dragon, a cat could become a mini white tiger, or a dog could become a playful "qilin". The creature should have large, expressive anime eyes, a rounded, simplified body, and incorporate iconic design elements of its mythical counterpart. The style should be cute, vibrant, and playful, suitable for a sticker or a character design. If there is no clear subject, gracefully decline the transformation.',
      }
    ]
  },
  {
    name: '日式二次元',
    effects: [
      {
        id: 'shinkai-style',
        name: '新海诚风滤镜',
        description: '捕捉光影的每一个瞬间',
        prompt: 'Transform this photo into the iconic style of a Makoto Shinkai film. The key is to create a hyper-realistic yet dreamlike atmosphere. Emphasize dramatic lighting with brilliant, detailed clouds, stunning sunsets/sunrises, and prominent light rays (crepuscular rays). Add subtle lens flares. The color palette should be incredibly vibrant and emotional, with deep blues in the shadows and glowing, warm highlights. Make every detail, from cityscapes to nature, look breathtakingly beautiful and full of nostalgic emotion.',
      },
      {
        id: 'jrpg-fantasy',
        name: 'JRPG幻想风',
        description: '最终幻想般的华丽与史诗感',
        prompt: 'Reimagine this photo as a piece of high-quality concept art for a Japanese Role-Playing Game (JRPG) like Final Fantasy. The style should be elegant, detailed, and epic. If there are characters, render them with intricate, fantasy-inspired attire and dynamic poses. Incorporate glowing magical elements, ornate patterns, and a sense of grandeur. The lighting should be dramatic and the colors rich and fantastical. The final image should feel like a key visual from an epic adventure story.',
      },
      {
        id: '90s-cel-anime',
        name: '90年代赛璐璐',
        description: '复古手绘动画的质感',
        prompt: 'Convert this photo to look like a frame from a 1990s cel-animated anime film or OVA. The image should have a distinct retro aesthetic. Use slightly softer, less defined lines compared to modern digital anime. Apply a subtle film grain over the entire image. The color palette should be characteristic of the 90s, often with less saturation and a unique color balance. Highlights should be simple and cell-shaded. The overall effect should evoke a sense of nostalgia for classic hand-drawn animation.',
      },
      {
        id: 'light-novel-cover',
        name: '轻小说封面',
        description: '高饱和度的精美插画',
        prompt: 'Transform this photo into a vibrant, eye-catching illustration suitable for a Japanese light novel cover. The style should be polished and modern. Use bright, highly saturated colors and clean, sharp line art. If there is a character, render them with large, expressive anime eyes and stylish hair. The composition should be dynamic, often with a clear focal point on the character against a detailed or stylized background. Add a professional, high-energy gloss to the entire image.',
      }
    ]
  },
  {
    name: '自然风光',
    effects: [
      {
        id: 'misty-forest',
        name: '迷雾森林',
        description: '增强绿色，增添神秘光线',
        prompt: 'Enhance the photo to create an enchanted, misty forest atmosphere. Deepen the greens and earthy tones. Add soft, volumetric light rays filtering through the trees, and a gentle, low-lying fog to create a sense of mystery and depth. The final image should feel magical and serene, like a scene from a fantasy story.',
      },
      {
        id: 'autumn-radiance',
        name: '秋日暖阳',
        description: '强化秋季的温暖色调',
        prompt: 'Amplify the autumn colors in this photograph. Boost the saturation and vibrancy of reds, oranges, and yellows to make the foliage glow. Add a warm, soft light to the scene, as if it were taken during a perfect autumn golden hour. The final image should feel cozy, warm, and full of the radiant beauty of fall.',
      },
      {
        id: 'tropical-paradise',
        name: '热带天堂',
        description: '让海岛风光更加鲜艳',
        prompt: 'Transform this photo into a vibrant tropical paradise. Dramatically enhance the blues of the sky and water, making them a brilliant turquoise or deep azure. Boost the greens of the palm trees and foliage to be lush and vivid. Increase the overall brightness and contrast to create a sunny, high-energy, postcard-perfect look.',
      },
      {
        id: 'breath-of-the-wild',
        name: '旷野之息',
        description: '提升风景照的自然细节',
        prompt: 'Apply a natural landscape enhancement effect. Subtly increase the clarity and texture of natural elements like rocks, trees, and clouds. Widen the dynamic range to reveal details in both the shadows and highlights, but without creating an artificial HDR look. Slightly boost the natural color saturation to make the scenery more vivid, while maintaining a realistic and breathtaking quality.',
      },
      {
        id: 'underwater-world',
        name: '海底世界',
        description: '增强水下照片的清晰度和色彩',
        prompt: 'Enhance this underwater photograph. Correct the color cast by reducing excess blue and green, and restore the natural vibrant colors of the coral and marine life. Increase clarity and contrast to cut through the haze of the water. Make the scene look clearer, more colorful, and full of life, as if viewed through crystal-clear water.',
      },
    ]
  },
  {
    name: '奇幻太空',
    effects: [
      {
        id: 'eye-of-cosmos',
        name: '星辰之眼',
        description: '史诗级星空增强',
        prompt: "Transform the sky in this photo into an epic and crystal-clear celestial masterpiece. Your primary goal is absolute sharpness and clarity. 1. **Stars**: Render all stars as tack-sharp, brilliantly clear points of light. There should be zero blur or smudging. The sky should be filled with a mix of fine, distant stars and a few brighter, more prominent ones that have a subtle, crisp glow. 2. **Milky Way**: The centerpiece should be a stunningly detailed Milky Way galaxy. Be creative with its composition: it could be a majestic vertical pillar of light, a grand horizontal arc stretching across the horizon, or a dynamic diagonal slash. The Milky Way must show intricate detail, with dark dust lanes contrasting against glowing nebulae and dense star fields. 3. **Details**: To enhance the realism and a sense of wonder, you may subtly add a small, distant star cluster if it complements the scene. 4. **Overall Mood**: The final image should be awe-inspiring, with a deep, dark sky that makes the celestial objects pop with incredible vibrancy and clarity. It should look like a professional astrophotograph taken under perfect conditions.",
      },
      {
        id: 'shooting-star',
        name: '流星划过',
        description: '为夜空增添一颗璀璨的流星',
        prompt: "First, transform the entire scene into a beautiful, clear night setting, ensuring the main subject is preserved and realistically lit for nighttime. Then, add a single, highly realistic and subtle shooting star (meteor) to the new night sky. KEY REQUIREMENTS FOR THE METEOR: It must be very small and faint, appearing as a delicate, thin streak of light. The head of the meteor should be just a tiny, sharp point of light, and its tail should be very short, thin, and quickly fading. CRITICAL: Avoid any exaggeration. Do not create a large, overly bright, or dramatic fireball or comet. The effect should be that of a common, faint meteor that one might realistically see and capture with a camera on a dark night. The final photograph must be believable and of high quality.",
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
    ]
  },
  {
    name: '深空幻想',
    effects: [
      {
        id: 'nebula-embrace',
        name: '星云之拥',
        description: '化身为创生之柱',
        prompt: "Transform the image into a breathtaking deep space nebula, reminiscent of the Pillars of Creation. Use the image's existing shapes and colors as a base to generate towering columns of interstellar gas and dust. The nebula should be illuminated from within by newborn stars, creating a vibrant, multi-hued glow with deep shadows that give it a three-dimensional structure. The final image should be awe-inspiring and cosmic.",
      },
      {
        id: 'galaxy-vortex',
        name: '旋涡星系',
        description: '融入宏伟的星系旋臂',
        prompt: "Superimpose or transform the scene into a majestic spiral galaxy. The main subject should be artistically integrated into the galactic core or a prominent spiral arm. The galaxy should feature a bright, dense core, well-defined spiral arms filled with young, blue stars, and dark dust lanes. The surrounding space should be filled with distant stars and smaller galaxies to create a sense of immense scale.",
      },
      {
        id: 'gravitational-singularity',
        name: '引力奇点',
        description: '凝视黑洞的深渊',
        prompt: "Introduce a photorealistic black hole into the image, creating a powerful and dramatic focal point. The black hole should be a perfect sphere of pure blackness, surrounded by a brightly glowing accretion disk of superheated gas. Crucially, implement a convincing gravitational lensing effect, where the background stars and light behind the black hole are warped and distorted around its edge. The scene should feel both terrifying and beautiful.",
      },
      {
        id: 'cosmic-rift',
        name: '宇宙裂隙',
        description: '撕开现实，窥视彼界',
        prompt: "Create a 'cosmic rift' or a tear in the fabric of spacetime within the image. This rift should appear as a jagged, glowing crack in the sky or scene. Through the crack, viewers should get a glimpse of a different, alien cosmos—perhaps with different colored stars, strange nebulae, or otherworldly galaxies. The edges of the rift should glow with intense energy, casting an ethereal light onto the rest of the scene.",
      }
    ]
  },
  {
    name: '专业模式',
    effects: [
      {
        id: 'portrait',
        name: '人像模式',
        description: '主体锐化，背景虚化',
        prompt: 'Apply a portrait mode effect. Sharpen the main subject and apply a subtle, natural-looking blur to the background to create depth of field.'
      },
      {
        id: 'de-shake',
        name: '智能去抖',
        description: '拯救手抖照片',
        prompt: "Analyze this photograph for motion blur and camera shake. Apply a powerful de-shaking and sharpening effect to restore maximum clarity and detail. The goal is to make the image look as if it were taken with a steady hand or a tripod, correcting the blur while maintaining a natural, photorealistic appearance. Do not introduce artificial textures or over-sharpening artifacts.",
      },
      {
        id: 'gourmet',
        name: '美食模式',
        description: '让食物看起来更美味',
        prompt: 'Enhance this photo to make the food look absolutely delicious. Increase warmth and saturation to make colors pop. Slightly increase sharpness and clarity to emphasize textures. Add a subtle, warm glow to make the dish look fresh and appetizing, as if it were in a high-end food magazine.',
      },
      {
        id: 'hdr',
        name: 'HDR 增强',
        description: '提升细节与动态范围',
        prompt: 'Apply a High Dynamic Range (HDR) effect to this image. Dramatically increase the detail in both the darkest shadows and brightest highlights. The image should look incredibly sharp, vibrant, and clear, with a wider range of tones than a standard photograph, but still look natural and not overly processed.',
      },
      {
        id: 'saturation-master',
        name: '饱和度大神',
        description: '鲜艳生动的色彩',
        prompt: "Apply a master-level saturation boost to this photograph. Your goal is to make all colors incredibly vibrant, rich, and full of life, without making them look unnatural or oversaturated. Intelligently enhance the saturation across the entire tonal range, making colors pop while carefully preserving natural skin tones and preventing color clipping in highly saturated areas. The final image should have a clean, punchy, and professional look with vivid colors that draw the viewer in.",
      },
      {
        id: 'minimalist',
        name: '日系清新',
        description: '明亮、干净、低饱和',
        prompt: 'Transform this photo with a clean, bright, and airy minimalist aesthetic, often seen in Japanese photography. Overexpose the image slightly to brighten it up. Desaturate the colors, giving them a soft, muted quality. Add a subtle cyan or cool blue tint to the shadows. The final image should feel calm, simple, and full of light.',
      },
      {
        id: 'tilt-shift',
        name: '移轴微缩',
        description: '将世界变成玩具模型',
        prompt: "Apply a tilt-shift effect to simulate a miniature scene. Keep a narrow, horizontal band in the center of the image perfectly sharp, and apply a strong, progressive blur to the areas above and below this band. Increase color saturation and contrast slightly to enhance the 'toy model' look. The final result should make the scene look like a tiny diorama.",
      },
    ]
  },
  {
    name: '未来与故障',
    effects: [
      {
        id: 'cyberpunk',
        name: '赛博朋克',
        description: '霓虹灯下的未来都市',
        prompt: "Dramatically transform this photo into an intense, futuristic cyberpunk cityscape. Saturate the scene with vibrant, glowing neon lights, focusing on electric blues, hot pinks, and acid greens. Plunge the shadows into deep, inky blacks to create extreme contrast. Add elements like holographic advertisements, rainy, reflective streets, and a dense, moody atmosphere. The final image should feel like a still from a high-budget sci-fi blockbuster film.",
      },
      {
        id: 'glitch',
        name: '故障艺术',
        description: '充满未来感的数字干扰',
        prompt: 'Transform this photo with a glitch art effect. Introduce digital artifacts like RGB color splitting, pixel sorting, datamoshing, and scan lines. The effect should be stylish and intentional, creating a futuristic, deconstructed aesthetic without making the original subject completely unrecognizable.',
      },
    ]
  },
];

export const MULTI_IMAGE_EFFECT_CATEGORIES: EffectCategory[] = [
  {
    name: '多图合成',
    effects: [
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
    ]
  }
];