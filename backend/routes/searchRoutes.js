import express from 'express';
import { searchFlights, searchHotels } from '../controllers/searchController.js';

const router = express.Router();

router.get('/flights', searchFlights);
router.get('/hotels', searchHotels);

export default router;
