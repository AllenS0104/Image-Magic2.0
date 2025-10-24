import React from 'react';

interface ResultDisplayProps {
  originalImage: string | null;
  processedImage: string | null;
  isLoading: boolean;
  error: string | null;
  hasContent: boolean;
  hasMultipleImages: boolean;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

const UndoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9l-3 3m0 0l3 3m-3-3h12.75" />
    </svg>
);
const RedoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9l3 3m0 0l-3 3m3-3H1.25" />
    </svg>
);
const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);
const InfoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const LoadingState: React.FC = () => (
  <div className="flex flex-col items-center justify-center gap-4 text-center">
    <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
    <h3 className="text-lg font-semibold text-white/80">正在处理...</h3>
    <p className="text-sm text-white/60 max-w-sm">
      AI 正在为您施展魔法，请稍候...
    </p>
  </div>
);

const Placeholder: React.FC<{ hasContent: boolean }> = ({ hasContent }) => {
    const icon = <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
    
    const title = hasContent ? "准备好见证魔法" : "欢迎使用魔法AI";
    const text = hasContent ? "请从左侧选择一个效果开始处理。" : "请先上传一个图片文件开始使用。";

    return (
    <div className="text-center text-gray-500">
        {icon}
        <h3 className="mt-4 text-xl font-medium text-white/80">{title}</h3>
        <p className="mt-1 text-sm text-gray-400">{text}</p>
    </div>
    )
};

const MultiImagePlaceholder: React.FC = () => (
    <div className="text-center text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V6a1 1 0 00-1-1H4z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9a1 1 0 00-1-1h-5a1 1 0 00-1 1v5a1 1 0 001 1h5a1 1 0 001-1V9z" />
        </svg>
        <h3 className="mt-4 text-xl font-medium text-white/80">
            准备好融合图片
        </h3>
        <p className="mt-1 text-sm text-gray-400">
            您已上传多张图片。请从左侧选择一个拼贴效果来开始创作。
        </p>
    </div>
);


export const ResultDisplay: React.FC<ResultDisplayProps> = ({ originalImage, processedImage, isLoading, error, hasContent, hasMultipleImages, onUndo, onRedo, canUndo, canRedo }) => {
  const toolbarButtonClasses = "disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 px-4 py-2 bg-transparent text-white/90 font-semibold rounded-full hover:enabled:bg-white/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-700 focus:ring-blue-500";
  
  const displayImage = processedImage || originalImage;
  
  const renderContent = () => {
    if (isLoading) {
        return <LoadingState />;
    }
    
    if (error) {
        return (
            <div className="text-center text-red-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-2 text-lg font-semibold">发生错误</h3>
                <p className="text-sm max-w-md mx-auto">{error}</p>
            </div>
        );
    }
    
    if (displayImage) {
      return (
        <div className="flex-grow w-full h-full relative p-2 bg-black/20 rounded-lg ring-1 ring-white/10">
          <img src={displayImage} alt={processedImage ? "处理后的图片" : "原始图片"} className="w-full h-full object-contain rounded-md" />
        </div>
      );
    }
    
    if (hasMultipleImages) {
        return <MultiImagePlaceholder />;
    }
    
    return <Placeholder hasContent={hasContent} />;
  }
  
  return (
    <div className="bg-gray-800 w-full h-full p-6 rounded-2xl shadow-lg border border-gray-700 flex flex-col items-center justify-center relative min-h-[400px] lg:min-h-0">
      <div className="w-full h-full flex flex-col gap-4 items-center justify-between">
        {renderContent()}
        
        {hasContent && !isLoading && !error && (
            <div className="flex items-center justify-center gap-2 mt-2 bg-gray-700/50 rounded-full p-1 shadow-lg border border-gray-700">
                <button onClick={onUndo} disabled={!canUndo} className={toolbarButtonClasses} aria-label="Undo change"><UndoIcon /> <span className="hidden sm:inline">撤销</span></button>
                <button onClick={onRedo} disabled={!canRedo} className={toolbarButtonClasses} aria-label="Redo change"><RedoIcon /> <span className="hidden sm:inline">重做</span></button>
                <div className="relative group flex items-center cursor-pointer px-2">
                    <InfoIcon />
                    <div className="absolute bottom-full mb-2 w-max max-w-[250px] p-3 text-xs text-center text-white/90 bg-gray-700 rounded-lg shadow-xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none origin-bottom z-20">
                        您的编辑历史会被保存，可以随时撤销和重做。放心大胆地尝试各种效果吧！
                    </div>
                </div>
                {processedImage && (
                    <>
                      <div className="w-px h-6 bg-white/20 mx-1"></div>
                      <a href={processedImage} download="processed-image.png" className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-full shadow-md hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-700 focus:ring-blue-500">
                        <DownloadIcon /> <span className="hidden sm:inline">下载图片</span>
                      </a>
                    </>
                )}
          </div>
        )}
      </div>
    </div>
  );
};
