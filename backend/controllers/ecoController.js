import db from '../config/db.js';

export const getUserPoints = async (req, res) => {
  try {
    const userId = req.headers['user-id'] || 'default_user';
    const pointsData = db.get('eco_points').filter({ userId }).value() || [];
    pointsData.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    let totalPoints = 0;
    pointsData.forEach(p => totalPoints += p.points);

    res.json({
        totalPoints,
        history: pointsData,
        achievements: [
            totalPoints >= 10 ? 'Recycled first item!' : null,
            totalPoints >= 100 ? 'Eco Warrior!' : null,
            pointsData.length >= 5 ? 'Reported 5 waste actions' : null
        ].filter(Boolean)
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch points' });
  }
};

export const addPoints = async (req, res) => {
  try {
    const { action } = req.body;
    const userId = req.headers['user-id'] || 'default_user';
    
    let points = 0;
    if (action === 'upload_waste') points = 10;
    if (action === 'report_hotspot') points = 15;
    if (action === 'visit_center') points = 20;

    if (points > 0) {
        db.get('eco_points')
          .push({ id: Date.now().toString(), userId, points, action, date: new Date().toISOString() })
          .write();
        
        let user = db.get('users').find({ id: userId }).value();
        if (!user) {
            user = { id: userId, email: `${userId}@eco.com`, ecoPoints: points };
            db.get('users').push(user).write();
        } else {
            user.ecoPoints += points;
            db.get('users').find({ id: userId }).assign({ ecoPoints: user.ecoPoints }).write();
        }

        res.json({ success: true, pointsAdded: points, userTotal: user.ecoPoints });
    } else {
        res.status(400).json({ error: 'Unknown action' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to add points' });
  }
};

export const getLeaderboard = async (req, res) => {
  try {
    const users = db.get('users').value() || [];
    users.sort((a, b) => b.ecoPoints - a.ecoPoints);
    res.json(users.slice(0, 10).map(u => ({ name: u.id, points: u.ecoPoints })));
  } catch (error) {
    res.status(500).json({ error: 'Failed to load leaderboard' });
  }
};
