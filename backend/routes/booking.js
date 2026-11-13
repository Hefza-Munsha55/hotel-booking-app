const express = require("express");
const multer = require("multer");
const Booking = require("../models/Booking");
const router = express.Router();

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) return cb(new Error("only image files allowed!"));
    cb(null, true);
  },
});

// CREATE BOOKING - POST /api/bookings
router.post("/", upload.single("idProof"), async (req, res) => {
  const { fullName, email, phone, hotel, roomNo, roomType, checkIn, checkOut, guests } = req.body;
  const errors = {};

  if (!fullName || fullName.trim().length < 3) errors.fullName = "Name at least 3 characters.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || "")) errors.email = "Valid email is required.";
  if (!/^03\d{9}$/.test(phone || "")) errors.phone = "Phone 03XXXXXXXXX format.";
  if (!hotel) errors.hotel = "select Hotel.";
  if (!roomNo) errors.roomNo = "Enter Room No. (e.g. 101).";
  if (!roomType) errors.roomType = "Select Room type.";
  if (!checkIn) errors.checkIn = "Check-in is mandatory.";
  if (!checkOut) errors.checkOut = "Check-out is mandatory.";
  if (checkIn && checkOut && new Date(checkOut) <= new Date(checkIn)) errors.checkOut = "Check-out,  after Check-in.";
  if (!guests || guests < 1 || guests > 6) errors.guests = "Guests should 1-6 .";

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ message: "Validation failed", errors });
  }

  try {
    const alreadyBooked = await Booking.findOne({
      hotel: hotel,
      roomNo: roomNo,
      checkIn: { $lt: new Date(checkOut) },
      checkOut: { $gt: new Date(checkIn) },
    });

    if (alreadyBooked) {
      return res.status(400).json({
        message: `Room No. ${roomNo} (${hotel}) already booked on this date. Choose a different date or room no.!`
      });
    }

    const newBooking = await Booking.create({
      fullName, email, phone, hotel, roomNo, roomType,
      checkIn, checkOut, guests,
      idProofImage: req.file ? req.file.filename : null,
    });
    res.status(201).json({ message: "Booking saved in MongoDB", data: newBooking });
  } catch (err) {
    res.status(500).json({ message: "Database error", error: err.message });
  }
});

// GET ALL BOOKINGS - GET /api/bookings
router.get("/", async (req, res) => {
  const bookings = await Booking.find().sort({ createdAt: -1 });
  res.json(bookings);
});

// NAYA: EDIT BOOKING - PUT /api/bookings/:id
router.put("/:id", async (req, res) => {
  try {
    const { hotel, roomNo, checkIn, checkOut } = req.body;

    // Overbooking check - lekin apni wali booking ko chor ke
    const alreadyBooked = await Booking.findOne({
      _id: { $ne: req.params.id }, // <-- apni booking ko check me shamil nahi karna
      hotel: hotel,
      roomNo: roomNo,
      checkIn: { $lt: new Date(checkOut) },
      checkOut: { $gt: new Date(checkIn) },
    });

    if (alreadyBooked) {
      return res.status(400).json({
        message: `Room No. ${roomNo} (${hotel}) already booked on this date. Choose a different date or room no.!`
      });
    }

    const updated = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: "Booking not found" });
    res.json({ message: "Booking updated", data: updated });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// NAYA: DELETE BOOKING - DELETE /api/bookings/:id
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Booking.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Booking not found" });
    res.json({ message: "Booking deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;