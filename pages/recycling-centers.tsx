import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { getRecyclingCenters, addEcoPoints } from '@/services/api';
import { MapPin, Info } from 'lucide-react';

export default function RecyclingCenters() {
    const [centers, setCenters] = useState<any[]>([]);

    useEffect(() => {
        getRecyclingCenters().then(setCenters).catch(console.error);
    }, []);

    const handleVisit = async () => {
        try {
            await addEcoPoints('visit_center');
            alert('Awesome! You just earned 20 Eco Points for visiting a recycling center!');
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className="pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
            <Head><title>Recycling Centers</title></Head>

            <h1 className="text-3xl font-bold text-gray-900 mb-8">Nearby Recycling Centers</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {centers.map(center => (
                    <div key={center.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="p-3 bg-eco-light rounded-xl text-eco">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-gray-800">{center.name}</h3>
                                <p className="text-sm text-gray-500">{center.address}</p>
                            </div>
                        </div>

                        <div className="mb-6">
                            <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Accepted Waste</p>
                            <div className="flex flex-wrap gap-2">
                                {center.acceptedWaste.map((type: string) => (
                                    <span key={type} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                                        {type}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                            <span className="text-sm font-medium text-gray-600">{center.distance} away</span>
                            <button onClick={handleVisit} className="text-sm font-bold text-eco hover:text-eco-dark flex items-center gap-1">
                                Check In
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {centers.length === 0 && (
                <div className="text-center py-20 text-gray-400">Loading centers...</div>
            )}
        </div>
    );
}
