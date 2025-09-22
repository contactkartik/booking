import Flight from '../models/Flight.js';
import Hotel from '../models/Hotel.js';

// Search flights by origin, destination, date, and optional filters
export const searchFlights = async (req, res) => {
  try {
    const { from, to, departDate, cabinClass, passengers, page = 1, limit = 12 } = req.query;

    const query = {};
    if (from) query.from = new RegExp(`^${from}$`, 'i');
    if (to) query.to = new RegExp(`^${to}$`, 'i');
    if (departDate) {
      const start = new Date(departDate);
      const end = new Date(departDate);
      end.setHours(23, 59, 59, 999);
      query.departDate = { $gte: start, $lte: end };
    }
    if (cabinClass) query.cabinClass = cabinClass;
    if (passengers) query.seatsLeft = { $gte: Number(passengers) };

    const p = Math.max(1, Number(page));
    const l = Math.min(50, Math.max(1, Number(limit)));
    const total = await Flight.countDocuments(query);
    const flights = await Flight.find(query)
      .sort({ price: 1, departDate: 1 })
      .skip((p - 1) * l)
      .limit(l);
    res.json({ results: flights, page: p, total, totalPages: Math.ceil(total / l) });
  } catch (err) {
    res.status(500).json({ message: 'Failed to search flights', error: err.message });
  }
};

// Search hotels by location, dates, guests and optional price filter
export const searchHotels = async (req, res) => {
  try {
    const { location, minPrice, maxPrice, page = 1, limit = 12 } = req.query;
    const query = {};
    if (location) query.location = new RegExp(location, 'i');
    if (minPrice || maxPrice) {
      query.pricePerNight = {};
      if (minPrice) query.pricePerNight.$gte = Number(minPrice);
      if (maxPrice) query.pricePerNight.$lte = Number(maxPrice);
    }

    const p = Math.max(1, Number(page));
    const l = Math.min(50, Math.max(1, Number(limit)));
    const total = await Hotel.countDocuments(query);
    const hotels = await Hotel.find(query)
      .sort({ pricePerNight: 1, rating: -1 })
      .skip((p - 1) * l)
      .limit(l);
    res.json({ results: hotels, page: p, total, totalPages: Math.ceil(total / l) });
  } catch (err) {
    res.status(500).json({ message: 'Failed to search hotels', error: err.message });
  }
};

