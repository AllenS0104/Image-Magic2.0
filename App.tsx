import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { EffectsPanel } from './components/EffectsPanel';
import { ResultDisplay } from './components/ResultDisplay';
import { applyPhotoEffect, generateRandomEffects, generateMultiImageSuggestions } from './services/geminiService';
import type { Effect } from './types';

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

function dataURLtoFile(dataurl: string, filename: string): File {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
};

const App: React.FC = () => {
  const [sourceFiles, setSourceFiles] = useState<File[]>([]);
  const [sourceImages, setSourceImages] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedEffectId, setSelectedEffectId] = useState<string | null>(null);
  const [randomEffects, setRandomEffects] = useState<Effect[]>([]);
  const [multiImageSuggestions, setMultiImageSuggestions] = useState<Effect[]>([]);
  const [isGeneratingEffects, setIsGeneratingEffects] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [preCompositionState, setPreCompositionState] = useState<{ files: File[], images: string[] } | null>(null);


  const currentImage = history[historyIndex] || null;
  const isMultiImageMode = sourceImages.length > 1;

  const resetAllState = useCallback(() => {
    setSourceFiles([]);
    setSourceImages([]);
    setHistory([]);
    setHistoryIndex(-1);
    setRandomEffects([]);
    setMultiImageSuggestions([]);
    setCustomPrompt('');
    setSelectedEffectId(null);
    setError(null);
    setPreCompositionState(null);
  }, []);

  const handleImageUpload = useCallback(async (files: File[]) => {
    if (files.length === 0) return;

    resetAllState();

    try {
      const imageFiles = files.filter(f => f.type.startsWith('image/'));
      if (imageFiles.length === 0) {
        setError("不支持的文件类型。请上传图片文件。");
        return;
      }
      
      setSourceFiles(imageFiles);
      const base64Promises = imageFiles.map(file => fileToBase64(file));
      const base64Images = await Promise.all(base64Promises);
      setSourceImages(base64Images);

      if (base64Images.length === 1) {
          setHistory([base64Images[0]]);
          setHistoryIndex(0);
      }
    } catch (err) {
      console.error("Error converting file to base64:", err);
      setError("无法读取图片文件。");
    }
  }, [resetAllState]);

  const handleRemoveImage = useCallback((indexToRemove: number) => {
      const newFiles = sourceFiles.filter((_, i) => i !== indexToRemove);
      const newImages = sourceImages.filter((_, i) => i !== indexToRemove);
      
      if (newImages.length === 0) {
        resetAllState();
        return;
      }
      
      setSourceFiles(newFiles);
      setSourceImages(newImages);
      setMultiImageSuggestions([]); // 清除建议，因为图片集已改变

      if (newImages.length === 1) {
        setHistory([newImages[0]]);
        setHistoryIndex(0);
      } else {
        setHistory([]);
        setHistoryIndex(-1);
      }
  }, [sourceFiles, sourceImages, resetAllState]);

  const handleSelectEffect = useCallback(async (effect: Effect) => {
    if (!currentImage && !isMultiImageMode) {
      setError("请先上传一张图片。");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSelectedEffectId(effect.id);

    try {
      let imagesToProcess: { data: string; mimeType: string }[];

      if (effect.multiImage) {
        imagesToProcess = sourceFiles.map((file, i) => ({ data: sourceImages[i].split(',')[1], mimeType: file.type }));
      } else {
        if (!currentImage) throw new Error("没有可用于处理的图像。");
        imagesToProcess = [{ data: currentImage.split(',')[1], mimeType: sourceFiles[0].type }];
      }
      
      const newBase64Data = await applyPhotoEffect(imagesToProcess, effect.prompt);

      if (newBase64Data) {
        const newMimeType = effect.multiImage ? 'image/png' : sourceFiles[0].type;
        const newImage = `data:${newMimeType};base64,${newBase64Data}`;
        
        if (effect.multiImage) {
          setPreCompositionState({ files: sourceFiles, images: sourceImages });
          const newFile = dataURLtoFile(newImage, `collage-${Date.now()}.png`);
          setSourceFiles([newFile]); setSourceImages([newImage]);
          setHistory([newImage]); setHistoryIndex(0);
          setMultiImageSuggestions([]); // 处理后清除建议
        } else {
          const newHistory = history.slice(0, historyIndex + 1);
          newHistory.push(newImage);
          setHistory(newHistory); setHistoryIndex(newHistory.length - 1);
        }
      } else {
        throw new Error("AI模型未能返回图片。");
      }
    } catch (err: any) {
      console.error("Error applying effect:", err);
      setError(err.message || "处理图片时发生未知错误。");
    } finally {
      setIsLoading(false);
    }
  }, [sourceFiles, sourceImages, currentImage, isMultiImageMode, history, historyIndex]);
  
  const handleGenerateRandomEffects = useCallback(async () => {
    if (!currentImage || sourceFiles.length === 0) {
      setError("请先上传一张图片。"); return;
    }
    setIsGeneratingEffects(true); setError(null);
    try {
      const baseImage = { data: currentImage.split(',')[1], mimeType: sourceFiles[0].type };
      const newEffects = await generateRandomEffects(baseImage);
      setRandomEffects(newEffects);
      setMultiImageSuggestions([]);
    } catch (err: any) {
      console.error("Error generating random effects:", err);
      setError(err.message || "生成随机效果时发生未知错误。");
    } finally {
      setIsGeneratingEffects(false);
    }
  }, [currentImage, sourceFiles]);

  const handleGenerateMultiImageSuggestions = useCallback(async () => {
    if (sourceFiles.length <= 1) {
      setError("此功能需要多张图片。"); return;
    }
    setIsGeneratingEffects(true); setError(null);
    try {
      const imagesToProcess = sourceFiles.map((file, i) => ({ data: sourceImages[i].split(',')[1], mimeType: file.type }));
      const newSuggestions = await generateMultiImageSuggestions(imagesToProcess);
      setMultiImageSuggestions(newSuggestions);
      setRandomEffects([]);
    } catch (err: any) {
      console.error("Error generating multi-image suggestions:", err);
      setError(err.message || "生成智能建议时发生未知错误。");
    } finally {
      setIsGeneratingEffects(false);
    }
  }, [sourceFiles, sourceImages]);
  
  const handleApplyCustomPrompt = useCallback(() => {
    if (!customPrompt.trim()) {
      setError("自定义Prompt不能为空。"); return;
    }
    const customEffect: Effect = {
      id: 'custom-' + Date.now(), name: '自定义效果',
      description: '用户自定义输入', prompt: customPrompt,
      multiImage: isMultiImageMode,
    };
    handleSelectEffect(customEffect);
  }, [customPrompt, handleSelectEffect, isMultiImageMode]);

  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
    } else if (historyIndex === 0 && preCompositionState) {
      setSourceFiles(preCompositionState.files);
      setSourceImages(preCompositionState.images);
      setHistory([]);
      setHistoryIndex(-1);
      setPreCompositionState(null);
    }
  }, [historyIndex, preCompositionState]);

  const handleRedo = useCallback(() => { if (historyIndex < history.length - 1) setHistoryIndex(historyIndex + 1); }, [historyIndex, history.length]);
  
  const canUndo = historyIndex > 0 || (historyIndex === 0 && preCompositionState !== null);
  const canRedo = historyIndex < history.length - 1;

  return (
    <div className="bg-gray-900 min-h-screen font-sans text-white">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3 flex flex-col gap-8">
            <ImageUploader 
              onImageUpload={handleImageUpload} 
              sourceImages={sourceImages}
              onRemoveImage={handleRemoveImage}
              onClearAll={resetAllState}
            />
            <EffectsPanel 
                onSelectEffect={handleSelectEffect} 
                selectedEffectId={selectedEffectId}
                isLoading={isLoading}
                isReady={sourceImages.length > 0}
                hasMultipleImages={isMultiImageMode}
                randomEffects={randomEffects}
                multiImageSuggestions={multiImageSuggestions}
                onGenerateRandomEffects={handleGenerateRandomEffects}
                onGenerateMultiImageSuggestions={handleGenerateMultiImageSuggestions}
                isGeneratingEffects={isGeneratingEffects}
                customPrompt={customPrompt}
                setCustomPrompt={setCustomPrompt}
                onApplyCustomPrompt={handleApplyCustomPrompt}
            />
          </div>
          <div className="lg:col-span-9">
            <ResultDisplay
              originalImage={sourceImages.length === 1 ? sourceImages[0] : null}
              processedImage={currentImage}
              isLoading={isLoading}
              error={error}
              hasContent={sourceImages.length > 0}
              hasMultipleImages={isMultiImageMode}
              onUndo={handleUndo}
              onRedo={handleRedo}
              canUndo={canUndo}
              canRedo={canRedo}
            />
          </div>
        </div>
      </main>
      <footer className="text-center py-6 text-sm text-gray-500">
        <p>由 Gemini API 强力驱动</p>
      </footer>
    </div>
  );
};

export default App;