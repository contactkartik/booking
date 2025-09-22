import express from 'express';
import { createFlightBooking, createHotelBooking, getUserBookings, cancelBooking } from '../controllers/bookingController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Create bookings
router.post('/flight', authMiddleware, createFlightBooking);
router.post('/hotel', authMiddleware, createHotelBooking);

// Get all bookings for a user
router.get('/user/:userId', authMiddleware, getUserBookings);

// Cancel a booking
router.patch('/:id/cancel', authMiddleware, cancelBooking);

export default router;
