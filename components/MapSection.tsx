import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix for default Leaflet marker icon with Next.js SSR
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const mockWasteLocations = [
    { id: 1, lat: 40.7128, lng: -74.0060, type: 'Plastic', ecoScore: 40 },
    { id: 2, lat: 40.7200, lng: -74.0100, type: 'Paper', ecoScore: 85 },
    { id: 3, lat: 40.7150, lng: -73.9900, type: 'Glass', ecoScore: 70 },
    { id: 4, lat: 40.7300, lng: -73.9800, type: 'Organic', ecoScore: 90 },
];

export default function MapSection() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="h-96 w-full bg-gray-100 rounded-2xl animate-pulse"></div>;

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Community Waste Map</h2>
            <div className="h-96 w-full rounded-xl overflow-hidden border border-gray-200 relative z-0">
                <MapContainer center={[40.7200, -74.0000]} zoom={12} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {mockWasteLocations.map(location => (
                        <Marker key={location.id} position={[location.lat, location.lng]}>
                            <Popup>
                                <div className="p-1 min-w-[120px]">
                                    <p className="font-semibold text-gray-800 border-b pb-1 mb-1">{location.type} Waste</p>
                                    <p className="text-sm text-gray-600 flex justify-between">
                                        <span>Eco Score:</span>
                                        <span className={`font-bold ${location.ecoScore >= 80 ? 'text-green-600' : location.ecoScore >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                                            {location.ecoScore}
                                        </span>
                                    </p>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
}
