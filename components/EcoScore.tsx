import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

interface EcoScoreProps {
    score: number;
}

export default function EcoScore({ score }: EcoScoreProps) {
    let color = '#ef4444'; // Red for 0-49
    let message = 'Consider better disposal options';

    if (score >= 80) {
        color = '#22c55e'; // Green
        message = 'Great! This item can be recycled';
    } else if (score >= 50) {
        color = '#eab308'; // Yellow
        message = 'Moderate environmental impact';
    }

    return (
        <div className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Eco Score Target</h3>
            <div className="flex-1 flex flex-col justify-center items-center">
                <div className="w-32 h-32 mb-6">
                    <CircularProgressbar
                        value={score}
                        text={`${score}`}
                        styles={buildStyles({
                            pathColor: color,
                            textColor: color,
                            trailColor: '#f3f4f6'
                        })}
                    />
                </div>
                <p className="text-gray-600 font-medium text-center">{message}</p>
            </div>
        </div>
    );
}
