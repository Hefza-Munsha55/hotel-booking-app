import { useState } from "react";
import "./BookingForm.css";

export default function BookingForm() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    hotel: "Hotel Pearl",
    roomNo: "",
    roomType: "Single",
    checkIn: "",
    checkOut: "",
    guests: 1,
  });
  const [file, setFile] = useState(null);
  // For phone error message
  const [phoneError, setPhoneError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Only digits allowed in phone
    if (name === "phone") {
      const onlyDigits = value.replace(/\D/g, "").slice(0, 11);
      setForm({ ...form, phone: onlyDigits });

      if (onlyDigits.length > 0 && onlyDigits.length < 11) {
        setPhoneError("Enter valid phone number - 11 digits only (e.g. 03001234567)");
      } else if (onlyDigits.length === 11 && !onlyDigits.startsWith("03")) {
        setPhoneError("Phone number should start from 03 (e.g. 03001234567)");
      } else {
        setPhoneError("");
      }
      return;
    }

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Final check before submit
    if (!/^03\d{9}$/.test(form.phone)) {
      setPhoneError("Enter valid phone number - 11 digits, only numbers, e.g. 03001234567");
      alert("Enter valid phone number - 11 digits, only numbers!");
      return;
    }

    const formData = new FormData();
    Object.keys(form).forEach((key) => formData.append(key, form[key]));

    if (file) {
      formData.append("idProof", file);
    }

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/bookings`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    console.log(data);
    if (res.ok) {
      alert("Booking is successful! ✅");
      window.location.reload();
    } else {
      alert("Error: " + (data.message || JSON.stringify(data)));
    }
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <h2>Book Your Room</h2>
      <input name="fullName" placeholder="Full Name (min 3 letters)" onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <input
        name="phone"
        placeholder="Phone Number (e.g. 03001234567)"
        value={form.phone}
        onChange={handleChange}
        inputMode="numeric"
        required
      />
      {phoneError && <p style={{ color: "red", fontSize: "13px", margin: "2px 0 8px 0" }}>{phoneError}</p>}
      <select name="hotel" onChange={handleChange}>
        <option>Hotel Pearl</option>
        <option>Hotel Royal</option>
        <option>Hotel City Inn</option>
      </select>
      <input name="roomNo" placeholder="Room No. (e.g. 101)" onChange={handleChange} required />
      <select name="roomType" onChange={handleChange}>
        <option>Single</option>
        <option>Double</option>
        <option>Suite</option>
      </select>
      <label>Check-In</label>
      <input type="date" name="checkIn" onChange={handleChange} required />
      <label>Check-Out</label>
      <input type="date" name="checkOut" onChange={handleChange} required />
      <input type="number" name="guests" min="1" max="6" value={form.guests} onChange={handleChange} />
      <label>ID Proof Image (Optional)</label>
      <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
      <button type="submit">Book Now</button>
    </form>
  );
}