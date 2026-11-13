const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  fullName: { type: String, required: true, minlength: 3 },
  email: { type: String, required: true, lowercase: true },
  phone: { type: String, required: true },
  hotel: { type: String, required: true },
  roomType: { type: String, enum: ["Single", "Double", "Suite"], required: true },
  roomNo: { type: String, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  guests: { type: Number, required: true, min: 1, max: 6 },
  idProofImage: { type: String }, // file ka naam
  status: { type: String, default: "Confirmed" },
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);