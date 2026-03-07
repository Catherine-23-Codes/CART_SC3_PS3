import React from 'react';
import { Volume2 } from 'lucide-react';

interface Prediction {
    type: string;
    confidence: number;
    method: string;
    tips?: string[];
}

interface PredictionCardProps {
    imagePreview: string | null;
    prediction: Prediction | null;
    isLoading?: boolean;
    errorMsg?: string | null;
}

const typeColors: Record<string, string> = {
    Plastic: 'bg-blue-100 text-blue-800',
    Paper: 'bg-yellow-100 text-yellow-800',
    Glass: 'bg-cyan-100 text-cyan-800',
    Organic: 'bg-green-100 text-green-800',
    Metal: 'bg-gray-200 text-gray-800',
};

const methodColors: Record<string, string> = {
    Recycle: 'bg-eco text-white',
    Compost: 'bg-green-600 text-white',
    Trash: 'bg-red-500 text-white',
};

export default function PredictionCard({ imagePreview, prediction, isLoading, errorMsg }: PredictionCardProps) {
    const handleVoiceGuidance = () => {
        if (!prediction) return;
        const text = `This waste is ${prediction.type}. Please put it in the ${prediction.method.toLowerCase()} bin. ${prediction.tips ? prediction.tips.join('. ') : ''}`;

        // Ensure that speech synthesis is supported
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(utterance);
        } else {
            alert("Sorry, your browser doesn't support text to speech!");
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col">
            <h3 className="text-xl font-bold text-gray-800 mb-4">AI Prediction</h3>

            <div className="flex-1 flex flex-col">
                {imagePreview ? (
                    <div className="relative w-full h-48 mb-6 rounded-xl overflow-hidden shadow-sm border border-gray-100 bg-gray-50 flex items-center justify-center">
                        <img src={imagePreview} alt="Waste preview" className="object-contain max-w-full max-h-full" />
                    </div>
                ) : (
                    <div className="w-full h-48 bg-gray-50 flex items-center justify-center rounded-xl border border-dashed border-gray-300 mb-6">
                        <span className="text-gray-400">No image uploaded</span>
                    </div>
                )}

                {isLoading ? (
                    <div className="w-full space-y-4 animate-pulse mt-auto bg-gray-50 p-4 rounded-xl">
                        <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-5 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-10 bg-gray-200 rounded-xl w-full mt-4"></div>
                    </div>
                ) : prediction ? (
                    <div className="w-full space-y-4 mt-auto bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                            <span className="text-gray-600 font-medium">Predicted Type</span>
                            <span className={`px-4 py-1.5 rounded-full text-sm font-bold shadow-sm ${typeColors[prediction.type] || 'bg-gray-100 text-gray-800'}`}>
                                {prediction.type}
                            </span>
                        </div>

                        <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                            <span className="text-gray-600 font-medium">Confidence Score</span>
                            <span className="font-bold text-gray-800 text-lg">{prediction.confidence.toFixed(1)}%</span>
                        </div>

                        <div className="flex flex-col gap-2 pt-2 border-b border-gray-200 pb-3">
                            <span className="text-gray-600 text-sm font-medium">Recommended Action</span>
                            <span className={`px-4 py-3 text-center rounded-xl font-bold shadow-sm ${methodColors[prediction.method] || 'bg-gray-100 text-gray-800'}`}>
                                {prediction.method}
                            </span>
                        </div>

                        {prediction.tips && prediction.tips.length > 0 && (
                            <div className="pt-2">
                                <span className="text-gray-600 text-sm font-medium">Eco-friendly Suggestions</span>
                                <ul className="list-disc list-inside text-sm text-gray-700 mt-2 space-y-1">
                                    {prediction.tips.map((tip, idx) => (
                                        <li key={idx}>{tip}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <button
                            onClick={handleVoiceGuidance}
                            className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl font-medium transition-colors"
                        >
                            <Volume2 className="w-5 h-5" />
                            Voice Guidance
                        </button>
                    </div>
                ) : errorMsg ? (
                    <div className="w-full space-y-4 mt-auto bg-red-50 p-6 rounded-xl border border-red-100 flex items-center justify-center text-red-600 font-medium text-center shadow-sm">
                        {errorMsg}
                    </div>
                ) : (
                    <div className="text-gray-400 text-center mt-auto py-8">Upload an image to see the classification results</div>
                )}
            </div>
        </div>
    );
}
