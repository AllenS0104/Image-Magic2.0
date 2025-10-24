import React, { useCallback, useRef, useState, useEffect } from 'react';

interface ImageUploaderProps {
  onImageUpload: (files: File[]) => void;
  sourceImages: string[];
  onRemoveImage: (index: number) => void;
  onClearAll: () => void;
}

const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>
);
const CameraIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);
const SwitchCameraIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5M4 20h5v-5M20 4h-5v5" />
    </svg>
);
const RemoveIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);
const AddIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
);
const ClearIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, sourceImages, onRemoveImage, onClearAll }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const stopCameraStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  }, []);

  const startCameraStream = useCallback(async (mode: 'user' | 'environment') => {
    stopCameraStream();
    setCameraError(null);
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: mode } });
        streamRef.current = stream;
        if (videoRef.current) { videoRef.current.srcObject = stream; }
    } catch (err) {
        console.error("Error accessing camera:", err);
        setCameraError('无法访问摄像头。请检查浏览器权限。');
    }
  }, [stopCameraStream]);
  
  useEffect(() => {
    if (isCameraOpen) { startCameraStream(facingMode); } 
    else { stopCameraStream(); }
    return () => stopCameraStream();
  }, [isCameraOpen, facingMode, startCameraStream, stopCameraStream]);


  const dataURLtoFile = (dataurl: string, filename: string): File => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) { u8arr[n] = bstr.charCodeAt(n); }
    return new File([u8arr], filename, { type: mime });
  };
  
  const handleTakePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/png');
        const file = dataURLtoFile(dataUrl, `capture-${Date.now()}.png`);
        onImageUpload([file]);
        setIsCameraOpen(false);
      }
    }
  };
  
  const handleSwitchCamera = () => setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) { onImageUpload(Array.from(e.target.files)); }
  };
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); e.stopPropagation(); setIsDragging(false);
    if (e.dataTransfer.files) {
      const files = Array.from(e.dataTransfer.files).filter((f: File) => f.type.startsWith('image/'));
      if (files.length > 0) { onImageUpload(files); }
    }
  }, [onImageUpload]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); }, []);
  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); }, []);
  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); }, []);
  const handleClick = () => { fileInputRef.current?.click(); };
  const commonButtonClasses = "w-full flex items-center justify-center px-4 py-2 text-white/90 font-semibold rounded-lg shadow-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500";
  
  const hasContent = sourceImages.length > 0;

  const renderContent = () => {
    if (isCameraOpen) {
       return (
        <div className="flex flex-col items-center gap-4">
            <div className="w-full aspect-video bg-black rounded-lg overflow-hidden relative">
                 <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                 <button onClick={handleSwitchCamera} className="absolute top-2 right-2 p-2 bg-black/50 rounded-full text-white hover:bg-black/75 transition-colors" aria-label="切换摄像头"><SwitchCameraIcon /></button>
            </div>
            {cameraError && <p className="text-red-400 text-sm text-center">{cameraError}</p>}
            <div className="w-full flex justify-center items-center gap-4">
                <button onClick={() => setIsCameraOpen(false)} className="px-4 py-2 bg-gray-700 text-white/90 font-semibold rounded-lg shadow-md hover:bg-gray-600 transition-colors">关闭</button>
                <button onClick={handleTakePhoto} className="w-16 h-16 rounded-full bg-white flex items-center justify-center border-4 border-gray-700 hover:border-blue-500 transition-all" aria-label="拍照"><div className="w-12 h-12 rounded-full bg-white ring-2 ring-inset ring-gray-700"></div></button>
            </div>
            <canvas ref={canvasRef} className="hidden"></canvas>
        </div>
      );
    }
    
    if (sourceImages.length > 0) {
      return (
         <div className="flex flex-col gap-4">
            <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto p-2 bg-gray-700/50 rounded-xl border border-gray-700">
                {sourceImages.map((src, index) => (
                    <div key={index} className="relative group aspect-square">
                        <img src={src} alt={`preview ${index + 1}`} className="w-full h-full object-cover rounded-md shadow-md" />
                        <button onClick={() => onRemoveImage(index)} className="absolute top-1 right-1 p-1 bg-black/60 rounded-full text-white hover:bg-red-500 transition-all opacity-0 group-hover:opacity-100" aria-label={`Remove image ${index + 1}`}><RemoveIcon /></button>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-2 gap-3">
                 <button onClick={handleClick} className={`${commonButtonClasses} bg-gray-700 hover:bg-gray-600`}><AddIcon /> 添加更多</button>
                 <button onClick={onClearAll} className={`${commonButtonClasses} bg-gray-700/60 hover:bg-gray-700`}><ClearIcon />全部清除</button>
            </div>
            <button onClick={() => setIsCameraOpen(true)} className={`${commonButtonClasses} bg-gray-700 hover:bg-gray-600 text-sm`}><CameraIcon />使用摄像头添加</button>
         </div>
      );
    }

    // Default empty state
    return (
        <>
            <div
                className={`relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors duration-200 ${isDragging ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700 hover:border-gray-500'}`}
                onClick={handleClick} onDrop={handleDrop} onDragOver={handleDragOver} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave}
            >
                <div className="flex flex-col items-center justify-center gap-2 text-white/60">
                    <UploadIcon />
                    <span className="font-semibold text-white/80">点击或拖拽图片到此处</span>
                    <p className="text-xs">支持 PNG, JPG, WEBP 等格式</p>
                </div>
            </div>
            <div className="relative flex items-center"><div className="flex-grow border-t border-gray-700"></div><span className="flex-shrink mx-4 text-xs text-gray-400">或</span><div className="flex-grow border-t border-gray-700"></div></div>
            <button onClick={() => setIsCameraOpen(true)} className={`${commonButtonClasses} bg-gray-700 hover:bg-gray-600`}><CameraIcon />使用摄像头拍照</button>
        </>
    );
  };

  return (
    <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-white/90">{hasContent ? '当前图片' : '1. 上传图片'}</h2>
      <input
        ref={fileInputRef} type="file" accept="image/png, image/jpeg, image/webp"
        className="hidden" multiple onChange={handleFileChange}
      />
      {renderContent()}
    </div>
  );
};
