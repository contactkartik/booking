import mongoose from 'mongoose';

const flightSchema = new mongoose.Schema(
  {
    airline: { type: String, required: true },
    flightNumber: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    departDate: { type: Date, required: true },
    arriveDate: { type: Date, required: true },
    price: { type: Number, required: true },
    durationMinutes: { type: Number, required: true },
    stops: { type: Number, default: 0 },
    cabinClass: { type: String, enum: ['Economy', 'Premium Economy', 'Business', 'First'], default: 'Economy' },
    seatsLeft: { type: Number, default: 50 },
  },
  { timestamps: true }
);

export default mongoose.model('Flight', flightSchema);
