import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { getImpactStats } from '@/services/api';
import { Share2, Leaf, Heart, CloudLightning, Droplets, TreePine } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = ['#3b82f6', '#22c55e', '#64748b', '#06b6d4', '#eab308', '#ec4899', '#f43f5e'];

export default function ImpactPage() {
    const [stats, setStats] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getImpactStats()
            .then(data => {
                setStats(data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch impact stats", err);
                setIsLoading(false);
            });
    }, []);

    let chartData: any[] = [];
    if (stats && stats.categoryCounts) {
        chartData = Object.keys(stats.categoryCounts)
            .map(key => ({
                name: key,
                value: stats.categoryCounts[key]
            })).filter(k => k.value > 0);
    }

    if (isLoading) {
        return <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="animate-spin w-12 h-12 border-4 border-eco border-t-transparent rounded-full"></div>
        </div>;
    }

    return (
        <div className="pb-20 bg-gray-50 min-h-screen">
            <Head>
                <title>Daily Impact - EcoSort AI</title>
            </Head>

            {/* Header */}
            <div className="bg-white border-b border-gray-100 shadow-sm mb-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900 flex items-center justify-center gap-3">
                        <Leaf className="w-10 h-10 text-eco" />
                        Today's Impact Report
                    </h1>
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg hover:text-gray-800 transition-colors">
                        "Small daily actions compound into massive global change."
                    </p>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Main Daily Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">

                    {/* Items Scanned Today */}
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-8 text-white shadow-md relative overflow-hidden transform hover:-translate-y-1 transition-all">
                        <div className="relative z-10">
                            <h2 className="text-lg font-bold text-indigo-100 uppercase tracking-wide mb-1">Items Scanned Today</h2>
                            <div className="flex items-baseline gap-2 mb-4">
                                <span className="text-6xl font-extrabold">{stats?.todayScanned || 0}</span>
                                <span className="text-xl font-medium text-indigo-100">items</span>
                            </div>
                            <p className="text-indigo-100 border-t border-indigo-400/30 pt-4 mt-4 text-sm font-medium">
                                Total AI waste classifications processed today.
                            </p>
                        </div>
                        <CloudLightning className="absolute right-[-20%] bottom-[-20%] w-64 h-64 text-white opacity-10 rotate-12" />
                    </div>

                    {/* How Much Is Recyclable */}
                    <div className="bg-gradient-to-br from-green-500 to-eco-dark rounded-3xl p-8 text-white shadow-md relative overflow-hidden transform hover:-translate-y-1 transition-all">
                        <div className="relative z-10">
                            <h2 className="text-lg font-bold text-green-100 uppercase tracking-wide mb-1">Recyclable Success</h2>
                            <div className="flex items-baseline gap-2 mb-4">
                                <span className="text-6xl font-extrabold">{stats?.todayRecyclable || 0}</span>
                                <span className="text-xl font-medium text-green-100">recycled</span>
                            </div>
                            <p className="text-green-100 border-t border-green-400/30 pt-4 mt-4 text-sm font-medium">
                                Out of {stats?.todayScanned || 0} items, {stats?.todayScanned ? Math.round(((stats?.todayRecyclable || 0) / stats.todayScanned) * 100) : 0}% were correctly diverted from landfills today!
                            </p>
                        </div>
                        <Heart className="absolute right-[-10%] top-[-10%] w-48 h-48 text-white opacity-10 -rotate-12" />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">

                    {/* Impact Stats */}
                    <div className="col-span-1 lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 p-8 flex flex-col justify-center">
                        <h3 className="text-xl font-bold text-gray-800 mb-6">Real-World Environmental Saves (Today)</h3>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="p-4 bg-blue-50 text-blue-500 rounded-2xl"><CloudLightning className="w-8 h-8" /></div>
                                <div className="flex-1 border-b border-gray-100 pb-4">
                                    <p className="text-3xl font-bold text-gray-900">{stats?.co2Saved || 0} <span className="text-lg font-medium text-gray-500">kg</span></p>
                                    <p className="text-sm font-medium text-gray-500">CO₂ Emissions Prevented</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="p-4 bg-cyan-50 text-cyan-500 rounded-2xl"><Droplets className="w-8 h-8" /></div>
                                <div className="flex-1 border-b border-gray-100 pb-4">
                                    <p className="text-3xl font-bold text-gray-900">{Math.round((stats?.todayRecyclable || 0) * 12.5)} <span className="text-lg font-medium text-gray-500">L</span></p>
                                    <p className="text-sm font-medium text-gray-500">Water Saved from pollution routing</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="p-4 bg-emerald-50 text-emerald-500 rounded-2xl"><TreePine className="w-8 h-8" /></div>
                                <div className="flex-1 pb-2">
                                    <p className="text-3xl font-bold text-gray-900">{((stats?.todayRecyclable || 0) * 0.05).toFixed(2)}</p>
                                    <p className="text-sm font-medium text-gray-500">Equivalent Trees planted</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Today's Distribution Chart */}
                    <div className="col-span-1 bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">Today's Content Breakdown</h3>
                        {chartData.length > 0 ? (
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={chartData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                            {chartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        ) : (
                            <div className="h-48 flex items-center justify-center text-gray-400 text-sm">
                                No items scanned today yet.
                            </div>
                        )}
                        <button className="w-full mt-6 py-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 font-bold rounded-xl flex items-center justify-center gap-2 transition-colors">
                            <Share2 className="w-4 h-4" /> Share Today's Impact
                        </button>
                    </div>

                </div>
            </main>
        </div>
    );
}
