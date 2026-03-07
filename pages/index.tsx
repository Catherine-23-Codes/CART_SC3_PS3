import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import UploadBox from '@/components/UploadBox';
import PredictionCard from '@/components/PredictionCard';
import EcoScore from '@/components/EcoScore';
import { uploadWasteImage, addEcoPoints, getAnalytics } from '@/services/api';

export default function Home() {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isClassifying, setIsClassifying] = useState(false);
    const [prediction, setPrediction] = useState<{ type: string; confidence: number; method: string; tips: string[] } | null>(null);
    const [ecoScore, setEcoScore] = useState<number>(0);
    const [stats, setStats] = useState<any>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        getAnalytics().then(data => setStats(data)).catch(console.error);
    }, []);

    const handleImageUpload = async (file: File) => {
        // Show preview
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result as string);
        reader.readAsDataURL(file);

        setIsClassifying(true);
        setPrediction(null);
        setEcoScore(0);
        setErrorMsg(null);

        try {
            const data = await uploadWasteImage(file);

            let method = 'Trash';
            let score = 30;
            if (data.category === 'Plastic') { method = 'Recycle'; score = 45; }
            if (data.category === 'Paper') { method = 'Recycle'; score = 85; }
            if (data.category === 'Glass') { method = 'Recycle'; score = 80; }
            if (data.category === 'Organic') { method = 'Compost'; score = 95; }
            if (data.category === 'Metal') { method = 'Recycle'; score = 75; }

            setPrediction({
                type: data.category,
                confidence: data.confidence * 100,
                method: method,
                tips: [data.tip]
            });
            setEcoScore(score);

            // Add Eco points for uploading waste
            await addEcoPoints('upload_waste');

        } catch (error: any) {
            console.error('Error classifying image:', error);
            const errorMessage = error.response?.data?.error || error.message || 'Error occurred during classification';
            setErrorMsg(`Prediction Failed: ${errorMessage}`);
        } finally {
            setIsClassifying(false);
        }
    };

    return (
        <div className="pb-20">
            <Head>
                <title>Home - Smart Waste Management System</title>
                <meta name="description" content="Smart Waste Management System using AI" />
            </Head>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Smart Waste Management System</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Upload an image of your waste item and our advanced AI will classify it instantly.
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
                            errorMsg={errorMsg}
                        />
                    </div>
                </div>

                {stats && typeof stats.totalWasteScanned !== 'undefined' && (
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center gap-10">
                        <div className="text-center">
                            <p className="text-sm font-medium text-gray-500">Total Scans</p>
                            <p className="text-3xl font-bold text-eco">{stats.totalWasteScanned}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-medium text-gray-500">System Accuracy</p>
                            <p className="text-3xl font-bold text-eco">{">90%"}</p>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
