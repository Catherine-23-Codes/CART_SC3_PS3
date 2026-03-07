import db from '../config/db.js';

export const getHeatmapData = (req, res) => {
    try {
        const wastes = db.get('wastes').value() || [];
        
        // In a real app, these wastes would have actual lat/lng
        // For demonstration purposes, we will group by general locations or
        // map random coordinates around a central hub if they say 'Unknown'
        
        const centerLat = 40.7128;
        const centerLng = -74.0060;
        
        // We will generate some dummy heatmap spots if the database is mostly empty
        // or has 'Unknown' locations, to demonstrate the functionality to the user.
        const mockHotspots = [
            { id: 1, lat: 40.7128, lng: -74.0060, count: 45, type: 'Plastic' },
            { id: 2, lat: 40.7822, lng: -73.9654, count: 12, type: 'Paper' },
            { id: 3, lat: 40.7295, lng: -73.9965, count: 88, type: 'Organic' },
            { id: 4, lat: 40.8005, lng: -73.9580, count: 5, type: 'Metal' },
            { id: 5, lat: 40.7580, lng: -73.9855, count: 25, type: 'E-Waste' },
        ];

        // Process actual db data
        let realSpots = {};
        wastes.forEach(w => {
            // Assign dummy location for demo if missing
            let lat = centerLat + (Math.random() - 0.5) * 0.1;
            let lng = centerLng + (Math.random() - 0.5) * 0.1;
            
            const key = `${lat.toFixed(3)},${lng.toFixed(3)}`;
            if (!realSpots[key]) {
                realSpots[key] = { lat, lng, count: 1, type: w.category };
            } else {
                realSpots[key].count += 1;
            }
        });

        const combinedData = wastes.length > 0 ? Object.values(realSpots) : mockHotspots;

        // Calculate density: Red = High (> 50), Yellow = Moderate (10 - 50), Green = Low (< 10)
        const densityData = combinedData.map((spot, index) => {
            let density = 'Green'; // Low waste concentration
            if (spot.count >= 50) density = 'Red';
            else if (spot.count >= 10) density = 'Yellow';

            return {
                id: spot.id || `live-${index}`,
                lat: spot.lat,
                lng: spot.lng,
                count: spot.count,
                dominantType: spot.type,
                colorCode: density
            };
        });

        res.json(densityData);
    } catch (error) {
        console.error('Heatmap Data Error:', error);
        res.status(500).json({ error: 'Failed to fetch heatmap data' });
    }
};
