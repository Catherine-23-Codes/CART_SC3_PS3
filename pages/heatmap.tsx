import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { getHeatmapData } from '@/services/api';
import { Map, Filter, AlertTriangle, Info } from 'lucide-react';

const HeatmapMap = dynamic(() => import('@/components/HeatmapMap'), { ssr: false });

export default function HeatmapPage() {
    const [data, setData] = useState<any[]>([]);
    const [filter, setFilter] = useState('All');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getHeatmapData()
            .then(res => {
                setData(res);
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Failed to load heatmap data", err);
                setIsLoading(false);
            });
    }, []);

    const allTypes = ['All', ...Array.from(new Set(data.map(item => item.dominantType)))];

    const filteredData = filter === 'All'
        ? data
        : data.filter(d => d.dominantType === filter);

    return (
        <div className="pb-20 bg-gray-50 min-h-screen">
            <Head>
                <title>Community Waste Heatmap</title>
            </Head>

            <div className="bg-white border-b border-gray-100 shadow-sm mb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
                        <Map className="w-8 h-8 text-eco" />
                        Community Waste Heatmap
                    </h1>
                    <p className="mt-2 text-gray-600 max-w-3xl">
                        Identify high-waste concentration zones across the community. Green indicates clean areas, Yellow is moderate, and Red requires immediate cleanup efforts.
                    </p>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Controls and Stats */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3">
                        <Filter className="w-5 h-5 text-gray-400" />
                        <span className="font-semibold text-gray-700">Filter by Waste Type:</span>
                        <div className="flex gap-2 overflow-x-auto pb-1 max-w-md md:max-w-full">
                            {allTypes.map(t => (
                                <button
                                    key={t}
                                    onClick={() => setFilter(t)}
                                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${filter === t
                                        ? 'bg-eco text-white shadow-sm'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm font-medium">
                        <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-red-500 rounded-full"></div> High ({">"}50)</div>
                        <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-yellow-500 rounded-full"></div> Medium (10-50)</div>
                        <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-green-500 rounded-full"></div> Low ({"<"}10)</div>
                    </div>
                </div>

                {/* Map Display */}
                <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100 relative">
                    {isLoading ? (
                        <div className="h-[500px] w-full flex items-center justify-center bg-gray-50 rounded-xl">
                            <div className="animate-spin w-10 h-10 border-4 border-eco border-t-transparent rounded-full"></div>
                        </div>
                    ) : (
                        <HeatmapMap data={filteredData} />
                    )}
                </div>

                {/* Summary Section */}
                {!isLoading && data.length > 0 && (
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-red-50 border border-red-100 p-6 rounded-2xl flex items-start gap-4">
                            <AlertTriangle className="w-6 h-6 text-red-500 mt-1" />
                            <div>
                                <h3 className="font-bold text-red-800">High Priority Action</h3>
                                <p className="text-red-700 text-sm mt-1">{data.filter(d => d.colorCode === 'Red').length} zones require immediate community cleanup.</p>
                            </div>
                        </div>
                        <div className="bg-eco-light/30 border border-eco/20 p-6 rounded-2xl flex items-start gap-4 md:col-span-2">
                            <Info className="w-6 h-6 text-eco mt-1" />
                            <div>
                                <h3 className="font-bold text-eco-dark">Community Impact</h3>
                                <p className="text-gray-700 text-sm mt-1">Data is crowdsourced through the EcoSort Waste App. By uploading waste reports, you are actively helping map pollution blind-spots around your entire community.</p>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
