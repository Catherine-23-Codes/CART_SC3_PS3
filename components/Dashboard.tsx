import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from 'recharts';
import { getAnalytics } from '@/services/api';

const COLORS = ['#3b82f6', '#22c55e', '#64748b', '#06b6d4', '#eab308', '#ec4899', '#f43f5e'];

export default function Dashboard() {
    const [stats, setStats] = useState<{ total: number, counts: any }>({
        total: 0,
        counts: {}
    });

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

    const chartData = Object.keys(stats.counts).map(key => ({
        name: key,
        value: stats.counts[key]
    })).filter(k => k.value > 0);

    // Dummy data for line/bar charts to represent trend
    const trendData = [
        { day: 'Mon', count: Math.max(1, stats.total - 10) },
        { day: 'Tue', count: stats.total - 8 },
        { day: 'Wed', count: stats.total - 5 },
        { day: 'Thu', count: stats.total - 2 },
        { day: 'Fri', count: stats.total }
    ];

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="h-72">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">Waste Distribution (Pie)</h3>
                    {chartData.length > 0 ? (
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
                    ) : <p className="text-gray-400 text-center flex items-center justify-center h-full">No waste scanned yet.</p>}
                </div>

                <div className="h-72">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">Daily Waste Detection (Bar)</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={trendData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="h-72 border-t pt-8 mt-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">Waste Trend Over Time (Line)</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="count" stroke="#22c55e" strokeWidth={3} activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
