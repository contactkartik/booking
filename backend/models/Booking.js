import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['flight', 'hotel'], required: true },
    flight: {
      flightId: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight' },
      passengers: [{
        name: String,
        age: Number,
        gender: String,
      }],
      totalPrice: Number,
    },
    hotel: {
      hotelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' },
      checkIn: Date,
      checkOut: Date,
      guests: Number,
      rooms: Number,
      totalPrice: Number,
    },
    status: { type: String, enum: ['confirmed', 'cancelled'], default: 'confirmed' },
  },
  { timestamps: true }
);

export default mongoose.model('Booking', bookingSchema);
