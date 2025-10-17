import express from 'express';
import { createFlightBooking, createHotelBooking, getUserBookings, cancelBooking, getAllBookings } from '../controllers/bookingController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import adminAuthMiddleware from '../middleware/adminAuthMiddleware.js';

const router = express.Router();

// Create bookings (user)
router.post('/flight', authMiddleware, createFlightBooking);
router.post('/hotel', authMiddleware, createHotelBooking);

// Get all bookings for a user (user)
router.get('/user/:userId', authMiddleware, getUserBookings);

// Cancel a booking (user)
router.patch('/:id/cancel', authMiddleware, cancelBooking);

// Get all bookings (admin)
router.get('/all', adminAuthMiddleware, getAllBookings);

export default router;
