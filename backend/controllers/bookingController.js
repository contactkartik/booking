import Booking from '../models/Booking.js';
import Flight from '../models/Flight.js';
import Hotel from '../models/Hotel.js';

// Create a flight booking
export const createFlightBooking = async (req, res) => {
  try {
    const { userId, flightId, passengers = [] } = req.body;
    if (!userId || !flightId) return res.status(400).json({ message: 'userId and flightId are required' });

    const flight = await Flight.findById(flightId);
    if (!flight) return res.status(404).json({ message: 'Flight not found' });
    if (flight.seatsLeft < passengers.length) return res.status(400).json({ message: 'Not enough seats available' });

    const totalPrice = flight.price * Math.max(1, passengers.length);

    const booking = await Booking.create({
      userId,
      type: 'flight',
      flight: {
        flightId,
        passengers,
        totalPrice,
      },
    });

    // Decrement seats
    flight.seatsLeft -= Math.max(1, passengers.length);
    await flight.save();

    res.status(201).json({ booking });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create flight booking', error: err.message });
  }
};

// Create a hotel booking
export const createHotelBooking = async (req, res) => {
  try {
    const { userId, hotelId, checkIn, checkOut, guests = 1, rooms = 1 } = req.body;
    if (!userId || !hotelId || !checkIn || !checkOut) {
      return res.status(400).json({ message: 'userId, hotelId, checkIn, and checkOut are required' });
    }

    const hotel = await Hotel.findById(hotelId);
    if (!hotel) return res.status(404).json({ message: 'Hotel not found' });

    // Simple nights calc
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    const nights = Math.ceil((outDate - inDate) / (1000 * 60 * 60 * 24));
    if (nights <= 0) return res.status(400).json({ message: 'checkOut must be after checkIn' });

    const totalPrice = hotel.pricePerNight * nights * Math.max(1, rooms);

    const booking = await Booking.create({
      userId,
      type: 'hotel',
      hotel: {
        hotelId,
        checkIn: inDate,
        checkOut: outDate,
        guests,
        rooms,
        totalPrice,
      },
    });

    // Optionally decrement rooms
    if (hotel.roomsAvailable >= rooms) {
      hotel.roomsAvailable -= rooms;
      await hotel.save();
    }

    res.status(201).json({ booking });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create hotel booking', error: err.message });
  }
};

// Get bookings for a user
export const getUserBookings = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ message: 'userId param is required' });

    const bookings = await Booking.find({ userId }).sort({ createdAt: -1 });
    res.json({ results: bookings });
  } catch (err) {
    res.status(500).json({ message: 'Failed to get bookings', error: err.message });
  }
};

// Cancel a booking
export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    booking.status = 'cancelled';
    await booking.save();

    res.json({ booking });
  } catch (err) {
    res.status(500).json({ message: 'Failed to cancel booking', error: err.message });
  }
};
