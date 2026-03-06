import React, { useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import UploadBox from '@/components/UploadBox';
import PredictionCard from '@/components/PredictionCard';
import EcoScore from '@/components/EcoScore';
import { Camera, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// Map component needs to be loaded dynamically because it relies on window/document at runtime
const MapSection = dynamic(() => import('@/components/MapSection'), { ssr: false });
const Dashboard = dynamic(() => import('@/components/Dashboard'), { ssr: false });

export default function DetectPage() {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isClassifying, setIsClassifying] = useState(false);
    const [prediction, setPrediction] = useState<{ type: string; confidence: number; method: string } | null>(null);
    const [ecoScore, setEcoScore] = useState<number>(0);

    const handleImageUpload = (file: File) => {
        // Show preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);

        // Mock AI classification process
        setIsClassifying(true);
        setPrediction(null);
        setEcoScore(0);

        setTimeout(() => {
            // Mock result
            const mockTypes = ['Plastic', 'Paper', 'Glass', 'Organic', 'Metal'];
            const randomType = mockTypes[Math.floor(Math.random() * mockTypes.length)];

            let method = 'Trash';
            let score = 30;

            if (randomType === 'Plastic') { method = 'Recycle'; score = 45; }
            if (randomType === 'Paper') { method = 'Recycle'; score = 85; }
            if (randomType === 'Glass') { method = 'Recycle'; score = 80; }
            if (randomType === 'Organic') { method = 'Compost'; score = 95; }
            if (randomType === 'Metal') { method = 'Recycle'; score = 75; }

            setPrediction({
                type: randomType,
                confidence: 85 + Math.random() * 14, // 85-99%
                method: method
            });
            setEcoScore(score);
            setIsClassifying(false);
        }, 2000); // 2 second mock delay
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Head>
                <title>Detect Waste Using AI - EcoSort AI</title>
                <meta name="description" content="Upload an image to detect waste type" />
            </Head>

            <nav className="bg-white px-6 py-4 shadow-sm border-b border-gray-100 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-eco transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                    <span className="font-medium">Back to Home</span>
                </Link>
                <div className="flex items-center gap-2">
                    <Camera className="w-6 h-6 text-eco" />
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-eco to-green-600">
                        EcoSort AI
                    </span>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Detect Waste Using AI</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Upload an image of your waste item and our advanced AI will classify it instantly, giving you an Eco Score and recommendations.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    <div className="flex flex-col gap-6">
                        <UploadBox onImageUpload={handleImageUpload} />
                        {imagePreview && (
                            <div className="flex-1">
                                <EcoScore score={ecoScore} />
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <PredictionCard
                            imagePreview={imagePreview}
                            prediction={prediction}
                            isLoading={isClassifying}
                        />
                    </div>
                </div>

                <div className="space-y-8 mt-16 border-t border-gray-200 pt-16">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">System Analytics</h2>
                    <Dashboard />
                    <MapSection />
                </div>
            </main>
        </div>
    );
}
