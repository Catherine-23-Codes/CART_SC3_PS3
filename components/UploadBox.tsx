import React, { useRef, useState } from 'react';
import { UploadCloud, Image as ImageIcon, Camera } from 'lucide-react';

interface UploadBoxProps {
    onImageUpload: (file: File) => void;
}

export default function UploadBox({ onImageUpload }: UploadBoxProps) {
    const [isDragActive, setIsDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const cameraInputRef = useRef<HTMLInputElement>(null);

    const handleDragEnter = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            if (file.type.startsWith('image/')) {
                onImageUpload(file);
            }
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            onImageUpload(e.target.files[0]);
        }
    };

    return (
        <div
            className={`border-2 border-dashed rounded-3xl p-10 flex flex-col items-center justify-center transition-all duration-200 ease-in-out cursor-pointer h-full min-h-[300px] ${isDragActive
                ? 'border-eco bg-eco-light/50 shadow-inner'
                : 'border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-eco/50'
                }`}
            onDragEnter={handleDragEnter}
            onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
        >
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
            />
            <input
                type="file"
                ref={cameraInputRef}
                onChange={handleFileChange}
                accept="image/*"
                capture="environment"
                className="hidden"
            />

            <div className={`p-5 rounded-full shadow-sm mb-5 transition-transform duration-300 ${isDragActive ? 'bg-eco scale-110' : 'bg-white'}`}>
                <UploadCloud className={`w-10 h-10 ${isDragActive ? 'text-white' : 'text-eco'}`} />
            </div>

            <h3 className="text-xl font-bold text-gray-800 mb-2">Upload or Drag Waste Image Here</h3>
            <div className="flex items-center gap-2 text-gray-500 text-sm mb-8">
                <ImageIcon className="w-4 h-4" />
                <p>Supports SVG, PNG, JPG (max. 5MB)</p>
            </div>

            <div className="flex gap-4 mt-2 z-10">
                <button
                    onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                    className="px-6 py-3 bg-eco hover:bg-eco-dark text-white rounded-xl font-semibold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                    Browse Files
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); cameraInputRef.current?.click(); }}
                    className="px-6 py-3 bg-white border border-eco text-eco hover:bg-eco-light rounded-xl font-semibold transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5 flex items-center gap-2"
                >
                    <Camera className="w-5 h-5" /> Take Photo
                </button>
            </div>
        </div>
    );
}
