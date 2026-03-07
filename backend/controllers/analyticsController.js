import db from '../config/db.js';

export const getAnalytics = async (req, res) => {
  try {
    const wastes = db.get('wastes').value() || [];
    
    // Convert to a dictionary for easier frontend handling
    let distribution = {
      Plastic: 0, Paper: 0, Glass: 0, Organic: 0, Metal: 0, 'E-Waste': 0, 'Non-Recyclable': 0
    };
    
    let totalWasteScanned = wastes.length;
    wastes.forEach(w => {
        if (distribution[w.category] !== undefined) {
             distribution[w.category]++;
        } else {
             distribution[w.category] = 1;
        }
    });

    res.json({
      totalWasteScanned,
      categoryCounts: distribution
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
};

export const getImpactStats = async (req, res) => {
  try {
    const wastes = db.get('wastes').value() || [];
    const today = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"
    
    // Filter out items scanned exactly today
    const todayWastes = wastes.filter(w => w.timestamp && w.timestamp.startsWith(today));
    
    let distribution = {
      Plastic: 0, Paper: 0, Glass: 0, Organic: 0, Metal: 0, 'E-Waste': 0, 'Non-Recyclable': 0
    };

    let todayTotal = todayWastes.length;
    let todayRecyclableCount = 0;

    todayWastes.forEach(w => {
      distribution[w.category] = (distribution[w.category] || 0) + 1;
      
      if (['Plastic', 'Paper', 'Glass', 'Metal'].includes(w.category)) {
          todayRecyclableCount++;
      }
    });

    res.json({
        todayScanned: todayTotal,
        todayRecyclable: todayRecyclableCount,
        categoryCounts: distribution,
        co2Saved: Math.round(todayRecyclableCount * 1.5) // 1.5kg CO2 saved per recycled item
    });
  } catch (error) {
      res.status(500).json({ error: 'Failed to fetch impact stats' });
  }
};

export const getHotspots = async (req, res) => {
  try {
    // Simply fetch grouped by location. In reality, should have actual lat/lng
    // Assuming some dummy hotspot data since we don't have complex geolocation
    const defaultHotspots = [
      { location: 'Downtown Hub', lat: 40.7128, lng: -74.0060, reports: 120 },
      { location: 'Central Park Station', lat: 40.7822, lng: -73.9654, reports: 85 },
      { location: 'University Campus', lat: 40.7295, lng: -73.9965, reports: 200 },
      { location: 'Riverside Walk', lat: 40.8005, lng: -73.9580, reports: 40 }
    ];
    
    res.json(defaultHotspots);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch hotspots' });
  }
};
