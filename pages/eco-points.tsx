import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { getEcoPoints } from '@/services/api';
import { Award, Trophy, CheckCircle, TrendingUp } from 'lucide-react';

export default function EcoPoints() {
    const [data, setData] = useState<{ totalPoints: number; history: any[]; achievements: string[] }>({
        totalPoints: 0,
        history: [],
        achievements: []
    });

    // In a real app we'd also fetch the leaderboard route, but here we summarize on screen
    useEffect(() => {
        getEcoPoints().then(setData).catch(console.error);
    }, []);

    return (
        <div className="pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
            <Head><title>Eco Points & Rewards</title></Head>

            <div className="bg-gradient-to-br from-eco to-green-600 rounded-3xl p-10 text-white mb-10 shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2">Your Eco Profile</h1>
                    <p className="text-eco-light/80 mb-8">Keep recycling to earn more rewards!</p>

                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-white/20 backdrop-blur-md rounded-2xl inline-flex items-center justify-center">
                            <Award className="w-10 h-10 text-yellow-300" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-white/80">Total Balance</p>
                            <p className="text-5xl font-extrabold">{data.totalPoints} <span className="text-2xl font-medium">pts</span></p>
                        </div>
                    </div>
                </div>
                <Trophy className="absolute -right-10 -bottom-10 w-64 h-64 text-white opacity-10" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Achievements */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-yellow-500" /> Achievements
                    </h2>

                    {data.achievements.length > 0 ? (
                        <div className="space-y-4">
                            {data.achievements.map((ach, i) => (
                                <div key={i} className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                                    <CheckCircle className="w-5 h-5 text-eco" />
                                    <span className="font-semibold text-gray-700">{ach}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10 text-gray-400">Complete actions to unlock achievements!</div>
                    )}
                </div>

                {/* Leaderboard / History */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-blue-500" /> Recent Actions
                    </h2>

                    <div className="space-y-4">
                        {data.history.length > 0 ? data.history.slice(0, 5).map((action, i) => (
                            <div key={i} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0">
                                <div>
                                    <p className="font-medium text-gray-800 capitalize">{action.action.replace('_', ' ')}</p>
                                    <p className="text-xs text-gray-500">{new Date(action.date).toLocaleDateString()}</p>
                                </div>
                                <span className="font-bold text-eco">+{action.points}</span>
                            </div>
                        )) : (
                            <div className="text-center py-10 text-gray-400">No actions recorded yet.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
