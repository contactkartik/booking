import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import searchRoutes from './routes/searchRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import seedRoutes from './routes/seedRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/api/users', userRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/seed', seedRoutes);

// Serve static files from the React app if present (in single-service deployments)
const distPath = path.join(__dirname, '../dist');
const hasDist = fs.existsSync(distPath);
if (hasDist) {
  app.use(express.static(distPath));
}


const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'your_mongo_atlas_connection_string';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Catch-all: if dist exists, return index.html (SPA). Otherwise, provide a basic API status.
app.get('*', (req, res) => {
  if (hasDist) {
    res.sendFile(path.join(distPath, 'index.html'));
  } else {
    res.status(200).json({ status: 'ok', service: 'backend', note: 'Static frontend not bundled on this service.' });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});