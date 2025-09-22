import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    address: { type: String },
    description: { type: String },
    rating: { type: Number, default: 4.5 },
    pricePerNight: { type: Number, required: true },
    amenities: [{ type: String }],
    roomsAvailable: { type: Number, default: 20 },
    images: [{ type: String }],
  },
  { timestamps: true }
);

hotelSchema.index({ location: 1 });
hotelSchema.index({ rating: -1 });
hotelSchema.index({ pricePerNight: 1 });

export default mongoose.model('Hotel', hotelSchema);
