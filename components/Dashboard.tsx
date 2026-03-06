import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const data = [
    { name: 'Plastic', value: 400 },
    { name: 'Organic', value: 300 },
    { name: 'Metal', value: 200 },
    { name: 'Glass', value: 100 },
    { name: 'Paper', value: 150 },
];

const COLORS = ['#3b82f6', '#22c55e', '#64748b', '#06b6d4', '#eab308'];

export default function Dashboard() {
    return (
        <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Waste Analytics Dashboard</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-eco-light rounded-xl border border-eco/20">
                    <p className="text-sm text-eco-dark font-medium mb-1">Total Waste Scanned</p>
                    <p className="text-3xl font-bold text-eco-dark">1,150</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <p className="text-sm text-blue-700 font-medium mb-1">Recycling Rate</p>
                    <p className="text-3xl font-bold text-blue-700">72%</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
                    <p className="text-sm text-purple-700 font-medium mb-1">Average Eco Score</p>
                    <p className="text-3xl font-bold text-purple-700">85/100</p>
                </div>
            </div>

            <div className="h-64 mt-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">Waste Distribution</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
