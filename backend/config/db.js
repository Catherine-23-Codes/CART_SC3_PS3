import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Use a flat JSON file for the database so it works out of the box without MongoDB installation!
const adapter = new FileSync(path.join(__dirname, '../data/db.json'));
const db = lowdb(adapter);

// Set default empty arrays if db is missing keys
db.defaults({ wastes: [], eco_points: [], users: [] }).write();

export default db;
