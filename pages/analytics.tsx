import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { getAnalytics } from '@/services/api';
import { TrendingUp, Recycle, Target, Activity } from 'lucide-react';

const Dashboard = dynamic(() => import('@/components/Dashboard'), { ssr: false });
const MapSection = dynamic(() => import('@/components/MapSection'), { ssr: false });

export default function Analytics() {
    const [stats, setStats] = useState<{ total: number, counts: any }>({ total: 0, counts: {} });

    useEffect(() => {
        getAnalytics().then(data => {
            if (data && data.categoryCounts) {
                setStats({
                    total: data.totalWasteScanned || 0,
                    counts: data.categoryCounts
                });
            }
        }).catch(console.error);
    }, []);

    // Derived Statistics
    const recyclableWaste = ['Plastic', 'Paper', 'Glass', 'Metal'].reduce((sum, key) => sum + (stats.counts[key] || 0), 0);
    const recycleRate = stats.total > 0 ? Math.round((recyclableWaste / stats.total) * 100) : 0;
    const co2Saved = Math.round(recyclableWaste * 1.5); // Approx 1.5kg CO2 saved per recycled item

    return (
        <div className="pb-20 bg-gray-50 min-h-screen">
            <Head>
                <title>Advanced Analytics - EcoSort AI</title>
            </Head>

            {/* Header Section */}
            <div className="bg-white border-b border-gray-100 shadow-sm mb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
                        <Activity className="w-8 h-8 text-eco" />
                        Platform Analytics
                    </h1>
                    <p className="mt-2 text-gray-600 max-w-2xl">
                        Monitor real-time system performance, track recycling rates, and visualize geographical waste data.
                    </p>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
                        <div>
                            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Total Scans</p>
                            <h2 className="text-4xl font-extrabold text-gray-900 mt-1">{stats.total}</h2>
                        </div>
                        <div className="p-4 bg-eco-light/50 rounded-xl text-eco">
                            <Target className="w-8 h-8" />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
                        <div>
                            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Avg Recycling Rate</p>
                            <h2 className="text-4xl font-extrabold text-gray-900 mt-1">{recycleRate}%</h2>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-xl text-blue-500">
                            <Recycle className="w-8 h-8" />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow relative overflow-hidden">
                        <div className="z-10">
                            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Est. CO₂ Prevented</p>
                            <h2 className="text-4xl font-extrabold text-eco mt-1">{co2Saved} <span className="text-lg font-medium text-gray-500">kg</span></h2>
                        </div>
                        <div className="absolute right-0 top-0 bottom-0 opacity-10 flex items-center pr-2">
                            <TrendingUp className="w-24 h-24 text-eco" />
                        </div>
                    </div>
                </div>

                {/* Dashboard Data Vizes */}
                <div className="mb-12">
                    <Dashboard />
                </div>

                {/* Maps Integration */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mt-8">
                    <div className="mb-6 border-b border-gray-100 pb-4">
                        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Geographical Hotspots</h2>
                        <p className="text-gray-500 mt-1">Live tracking of high-density waste concentration zones.</p>
                    </div>
                    <div className="relative">
                        <MapSection />
                    </div>
                </div>
            </main>
        </div>
    );
}
