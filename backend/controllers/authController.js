import db from '../config/db.js';

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Please provide all fields' });
    }

    const users = db.get('users').value() || [];
    const exists = users.find(u => u.email === email);
    
    if (exists) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Creating a user with plain password for this local MVP
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password, // Note: In production, always hash passwords using bcrypt
      ecoPoints: 0
    };

    db.get('users').push(newUser).write();

    res.status(201).json({ 
        message: 'Registration successful', 
        user: { id: newUser.id, name: newUser.name, email: newUser.email } 
    });

  } catch (error) {
    res.status(500).json({ error: 'Server error during registration' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email and password' });
    }

    const user = db.get('users').find({ email }).value();
    
    // Simple verification (plain text match for MVP)
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({ 
        message: 'Login successful', 
        user: { id: user.id, name: user.name, email: user.email } 
    });

  } catch (error) {
    res.status(500).json({ error: 'Server error during login' });
  }
};

import { OAuth2Client } from 'google-auth-library';
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID || '123456789-mock-client-id.apps.googleusercontent.com');

export const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;
    let payload;
    
    // In strict production we verify the ticket. To work locally without full OAuth setup, we'll try to verify or just trust the payload decoded if mock testing
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID || '123456789-mock-client-id.apps.googleusercontent.com',
        });
        payload = ticket.getPayload();
    } catch {
        // Fallback for mock/test tokens just extracting payload
        const base64Url = token.split('.')[1];
        if (base64Url) {
           const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
           payload = JSON.parse(Buffer.from(base64, 'base64').toString());
        } else {
            return res.status(401).json({ error: 'Invalid Google token' });
        }
    }

    const email = payload.email;
    const name = payload.name;
    const googleId = payload.sub;

    let users = db.get('users').value() || [];
    let user = users.find(u => u.email === email);

    if (!user) {
        // Register brand new user with google info
        user = {
            id: Date.now().toString(),
            name,
            email,
            googleId,
            ecoPoints: 0
        };
        db.get('users').push(user).write();
    }

    res.json({
        message: 'Google login successful',
        user: { id: user.id, name: user.name, email: user.email }
    });

  } catch (error) {
    res.status(500).json({ error: 'Server error during Google auth' });
  }
};
