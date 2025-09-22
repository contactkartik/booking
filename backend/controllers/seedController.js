import Flight from '../models/Flight.js';
import Hotel from '../models/Hotel.js';

export const seedData = async (_req, res) => {
  try {
    // Clear existing sample data
    await Flight.deleteMany({});
    await Hotel.deleteMany({});

    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 9, 0, 0);

    const flights = await Flight.insertMany([
      {
        airline: 'IndiGo',
        flightNumber: '6E-201',
        from: 'Delhi',
        to: 'Mumbai',
        departDate: tomorrow,
        arriveDate: new Date(tomorrow.getTime() + 2.5 * 60 * 60 * 1000),
        price: 4500,
        durationMinutes: 150,
        stops: 0,
        cabinClass: 'Economy',
        seatsLeft: 30,
      },
      {
        airline: 'Air India',
        flightNumber: 'AI-865',
        from: 'Delhi',
        to: 'Mumbai',
        departDate: tomorrow,
        arriveDate: new Date(tomorrow.getTime() + 2.75 * 60 * 60 * 1000),
        price: 5200,
        durationMinutes: 165,
        stops: 0,
        cabinClass: 'Economy',
        seatsLeft: 25,
      },
    ]);

    const hotels = await Hotel.insertMany([
      {
        name: 'The Taj Mahal Palace',
        location: 'Mumbai',
        address: 'Apollo Bandar, Colaba, Mumbai',
        description: 'Iconic luxury hotel with sea views and world-class amenities.',
        rating: 4.8,
        pricePerNight: 12000,
        amenities: ['Pool', 'Spa', 'WiFi'],
        roomsAvailable: 15,
        images: [],
      },
      {
        name: 'Leela Palace',
        location: 'New Delhi',
        address: 'Diplomatic Enclave, New Delhi',
        description: 'Elegant rooms, fine dining, and a central location.',
        rating: 4.7,
        pricePerNight: 9000,
        amenities: ['Gym', 'WiFi'],
        roomsAvailable: 20,
        images: [],
      },
    ]);

    res.json({ message: 'Seeded sample data', flights, hotels });
  } catch (err) {
    res.status(500).json({ message: 'Failed to seed data', error: err.message });
  }
};
