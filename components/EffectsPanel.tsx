import React from 'react';
import { SINGLE_IMAGE_EFFECT_CATEGORIES, MULTI_IMAGE_EFFECT_CATEGORIES } from '../constants';
import type { Effect, EffectCategory } from '../types';

interface EffectsPanelProps {
  onSelectEffect: (effect: Effect) => void;
  selectedEffectId: string | null;
  isLoading: boolean;
  isReady: boolean;
  hasMultipleImages: boolean;
  randomEffects: Effect[];
  multiImageSuggestions: Effect[];
  onGenerateRandomEffects: () => void;
  onGenerateMultiImageSuggestions: () => void;
  isGeneratingEffects: boolean;
  customPrompt: string;
  setCustomPrompt: (prompt: string) => void;
  onApplyCustomPrompt: () => void;
  adjustments: { saturation: number; contrast: number; sharpness: number; };
  onAdjustmentChange: (adjustments: { saturation: number; contrast: number; sharpness: number; }) => void;
  onApplyManualAdjustments: () => void;
  onResetAdjustments: () => void;
}

const SparkleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M19 3v4M17 5h4M12 2v4M10 4h4M8 10l-2 2 2 2M16 10l2 2-2 2M12 18v4M10 20h4M5 17l2-2 2 2M15 17l2 2 2-2" />
    </svg>
);

const LoadingSpinnerMini = () => (
    <div className="w-5 h-5 border-2 border-dashed rounded-full animate-spin border-white mr-2"></div>
);

const AdjustmentSlider: React.FC<{
  id: 'saturation' | 'contrast' | 'sharpness';
  label: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}> = ({ id, label, value, onChange, disabled }) => (
    <div className="flex flex-col gap-1">
        <div className="flex justify-between text-sm">
            <label htmlFor={id} className="text-white/80">{label}</label>
            <span className={`font-mono text-white/90 transition-colors ${value !== 0 ? 'text-blue-400' : ''}`}>{value > 0 ? `+${value}`: value}</span>
        </div>
        <input
            id={id}
            type="range"
            min="-100"
            max="100"
            value={value}
            onChange={onChange}
            disabled={disabled}
            className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer range-thumb disabled:cursor-not-allowed"
        />
    </div>
);


export const EffectsPanel: React.FC<EffectsPanelProps> = ({ 
    onSelectEffect, 
    selectedEffectId, 
    isLoading, 
    isReady,
    hasMultipleImages,
    randomEffects,
    multiImageSuggestions,
    onGenerateRandomEffects,
    onGenerateMultiImageSuggestions,
    isGeneratingEffects,
    customPrompt,
    setCustomPrompt,
    onApplyCustomPrompt,
    adjustments,
    onAdjustmentChange,
    onApplyManualAdjustments,
    onResetAdjustments
}) => {
  
  let categoriesToShow: EffectCategory[] = [];
  if (hasMultipleImages) {
    if (multiImageSuggestions.length > 0) {
        categoriesToShow = [{ name: 'AI 智能建议', effects: multiImageSuggestions }, ...MULTI_IMAGE_EFFECT_CATEGORIES];
    } else {
        categoriesToShow = MULTI_IMAGE_EFFECT_CATEGORIES;
    }
  } else {
    if (randomEffects.length > 0) {
        categoriesToShow = [{ name: 'AI 为您生成', effects: randomEffects }, ...SINGLE_IMAGE_EFFECT_CATEGORIES];
    } else {
        categoriesToShow = SINGLE_IMAGE_EFFECT_CATEGORIES;
    }
  }
  
  const isPanelDisabled = !isReady || isLoading || isGeneratingEffects;
  const areAdjustmentsMade = adjustments.saturation !== 0 || adjustments.contrast !== 0 || adjustments.sharpness !== 0;


  const handleAIGenerateClick = () => {
    if (hasMultipleImages) {
        onGenerateMultiImageSuggestions();
    } else {
        onGenerateRandomEffects();
    }
  }

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    onAdjustmentChange({
        ...adjustments,
        [id]: Number(value),
    });
  };

  return (
    <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-white/90">2. 选择魔法效果</h2>
      
      <button
          onClick={handleAIGenerateClick}
          disabled={isPanelDisabled}
          className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md transition-colors duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 disabled:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGeneratingEffects ? <LoadingSpinnerMini /> : <SparkleIcon />}
          {isGeneratingEffects ? '正在生成...' : (hasMultipleImages ? 'AI智能建议' : 'AI生成新效果')}
        </button>

      <div className={`transition-opacity duration-300 ${!isReady ? 'opacity-50 cursor-not-allowed' : ''}`}>
        {categoriesToShow.map((category) => (
          <div key={category.name} className="mt-6 first:mt-0">
            <h3 className="text-base font-semibold text-white/80 mb-3">{category.name}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {category.effects.map((effect) => (
                <button
                  key={effect.id}
                  onClick={() => onSelectEffect(effect)}
                  disabled={isPanelDisabled}
                  className={`
                    flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all duration-200 h-24
                    ${selectedEffectId === effect.id ? 'border-blue-500 bg-blue-500/20' : 'border-gray-700 bg-gray-700/50 hover:border-gray-500 hover:bg-gray-600'}
                    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-700 disabled:hover:bg-gray-700/50
                  `}
                >
                  <span className="font-semibold text-white/90 text-center text-sm">{effect.name}</span>
                  <span className="text-xs text-white/60 text-center mt-1">{effect.description}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t border-gray-700 my-2"></div>

      <div className={`transition-opacity duration-300 ${hasMultipleImages ? 'opacity-50 cursor-not-allowed' : ''}`}>
        <h3 className="text-lg font-semibold text-white/80 mb-3">手动微调</h3>
        <div className="flex flex-col gap-4">
            <AdjustmentSlider id="saturation" label="饱和度" value={adjustments.saturation} onChange={handleSliderChange} disabled={isPanelDisabled || hasMultipleImages} />
            <AdjustmentSlider id="contrast" label="对比度" value={adjustments.contrast} onChange={handleSliderChange} disabled={isPanelDisabled || hasMultipleImages} />
            <AdjustmentSlider id="sharpness" label="锐度" value={adjustments.sharpness} onChange={handleSliderChange} disabled={isPanelDisabled || hasMultipleImages} />
            
            <div className="grid grid-cols-2 gap-3 mt-2">
                <button
                    onClick={onResetAdjustments}
                    disabled={isPanelDisabled || hasMultipleImages || !areAdjustmentsMade}
                    className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg shadow-md transition-colors duration-300 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-400 disabled:bg-gray-600/50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    重置
                </button>
                <button
                    onClick={onApplyManualAdjustments}
                    disabled={isPanelDisabled || hasMultipleImages || !areAdjustmentsMade}
                    className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md transition-colors duration-300 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-green-500 disabled:bg-green-600/50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    应用调整
                </button>
            </div>
        </div>
      </div>
      
      <div className="border-t border-gray-700 my-2"></div>

      <div>
        <h3 className="text-lg font-semibold text-white/80 mb-3">或者，自定义Prompt</h3>
        <div className="flex flex-col gap-3">
          <textarea
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder="例如：让这张照片看起来像梵高的油画《星空》"
            disabled={isPanelDisabled}
            className="w-full h-24 p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white/90 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <button
            onClick={onApplyCustomPrompt}
            disabled={isPanelDisabled || !customPrompt.trim()}
            className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md transition-colors duration-300 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-green-500 disabled:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            应用自定义效果
          </button>
        </div>
      </div>

       {!isReady && (
        <p className="text-sm text-center text-yellow-400/80 mt-2">
          请先上传一张图片才能选择效果。
        </p>
      )}
      {hasMultipleImages && (
        <p className="text-sm text-center text-blue-400/80 mt-2">
            {multiImageSuggestions.length > 0 ? '以上是AI为您生成的专属建议！' : '您已上传多张图片，请选择效果或让AI提供建议。'}
        </p>
      )}
    </div>
  );
};