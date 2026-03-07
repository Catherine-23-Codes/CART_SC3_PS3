import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default Leaflet markers in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
});

interface HeatmapSpot {
    id: string | number;
    lat: number;
    lng: number;
    count: number;
    dominantType: string;
    colorCode: 'Red' | 'Yellow' | 'Green';
}

const colorMap = {
    Red: '#ef4444',
    Yellow: '#eab308',
    Green: '#22c55e'
};

interface HeatmapMapProps {
    data: HeatmapSpot[];
}

export default function HeatmapMap({ data }: HeatmapMapProps) {
    if (typeof window === 'undefined') return <div className="h-96 w-full animate-pulse bg-gray-200 rounded-xl" />;

    const defaultCenter: [number, number] = [40.7128, -74.0060];

    return (
        <div className="h-[500px] w-full rounded-2xl overflow-hidden shadow-sm border border-gray-100 z-0 relative">
            <MapContainer
                center={defaultCenter}
                zoom={12}
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {data.map((spot) => (
                    <CircleMarker
                        key={spot.id}
                        center={[spot.lat, spot.lng]}
                        pathOptions={{
                            color: colorMap[spot.colorCode],
                            fillColor: colorMap[spot.colorCode],
                            fillOpacity: 0.6
                        }}
                        radius={Math.max(10, Math.min(30, spot.count * 2))}
                    >
                        <Popup>
                            <div className="text-center p-1">
                                <h4 className="font-bold text-gray-800 border-b pb-1 mb-1">Density Report</h4>
                                <p className="text-sm"><strong>Type:</strong> <span className="text-eco">{spot.dominantType}</span></p>
                                <p className="text-sm"><strong>Reports:</strong> {spot.count}</p>
                                <p className="text-xs text-gray-400 mt-2">Status: {spot.colorCode}</p>
                            </div>
                        </Popup>
                    </CircleMarker>
                ))}
            </MapContainer>
        </div>
    );
}
