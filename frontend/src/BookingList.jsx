import { useEffect, useState } from "react";
import "./BookingList.css";

export default function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const loadBookings = () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/bookings`)
      .then((res) => res.json())
      .then((data) => setBookings(data));
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`${name} you want to delete your booking?`)) return;
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/bookings/${id}`, { method: "DELETE" });
    if (res.ok) {
      alert("Booking deleted! ✅");
      loadBookings();
    } else {
      alert("Delete error!");
    }
  };

  const startEdit = (b) => {
    setEditingId(b._id);
    setEditForm({
      fullName: b.fullName,
      email: b.email,
      phone: b.phone,
      hotel: b.hotel,
      roomNo: b.roomNo || "",
      roomType: b.roomType,
      checkIn: b.checkIn ? b.checkIn.slice(0, 10) : "",
      checkOut: b.checkOut ? b.checkOut.slice(0, 10) : "",
      guests: b.guests,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      setEditForm({ ...editForm, phone: value.replace(/\D/g, "").slice(0, 11) });
      return;
    }
    setEditForm({ ...editForm, [name]: value });
  };

  const saveEdit = async (id) => {
    if (!/^03\d{9}$/.test(editForm.phone)) {
      alert("Enter valid phone number - 11 digits, e.g. 03001234567");
      return;
    }
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/bookings/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    });
    const data = await res.json();
    if (res.ok) {
      alert("Booking updated! ✅");
      setEditingId(null);
      loadBookings();
    } else {
      alert("Error: " + (data.message || JSON.stringify(data)));
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto" }}>
      <h2 className="all-bookings-title">All Bookings</h2>
      {bookings.length === 0 ? <p>No Booking Yet.</p> : null}
      {bookings.map((b) => (
        <div key={b._id} style={{ border: "1px solid #ddd", padding: "10px", margin: "10px 0", borderRadius: "8px" }}>
          {editingId === b._id ? (
            <div>
              <input name="fullName" value={editForm.fullName} onChange={handleEditChange} placeholder="Full Name" style={{ width: "100%", marginBottom: "5px", padding: "6px" }} />
              <input name="email" value={editForm.email} onChange={handleEditChange} placeholder="Email" style={{ width: "100%", marginBottom: "5px", padding: "6px" }} />
              <input name="phone" value={editForm.phone} onChange={handleEditChange} placeholder="Phone 0300..." style={{ width: "100%", marginBottom: "5px", padding: "6px" }} />
              <input name="roomNo" value={editForm.roomNo} onChange={handleEditChange} placeholder="Room No." style={{ width: "100%", marginBottom: "5px", padding: "6px" }} />
              <div style={{ display: "flex", gap: "5px", marginBottom: "5px" }}>
                <label>Check-In</label>
                <input type="date" name="checkIn" value={editForm.checkIn} onChange={handleEditChange} />
                <label>Check-Out</label>
                <input type="date" name="checkOut" value={editForm.checkOut} onChange={handleEditChange} />
              </div>
              <input type="number" name="guests" min="1" max="6" value={editForm.guests} onChange={handleEditChange} style={{ width: "100%", marginBottom: "8px", padding: "6px" }} />
              <button onClick={() => saveEdit(b._id)} style={{ background: "green", color: "white", border: "none", padding: "6px 12px", borderRadius: "5px", marginRight: "8px", cursor: "pointer" }}>Save ✅</button>
              <button onClick={() => setEditingId(null)} style={{ background: "gray", color: "white", border: "none", padding: "6px 12px", borderRadius: "5px", cursor: "pointer" }}>Cancel</button>
            </div>
          ) : (
            <div>
              <b>{b.fullName}</b> - {b.hotel} - {b.roomType} Room - Room No. {b.roomNo} <br />
              {b.email} | {b.phone} <br />
              {new Date(b.checkIn).toLocaleDateString()} to {new Date(b.checkOut).toLocaleDateString()} - {b.guests} Guests
              <div style={{ marginTop: "8px", display: "flex", gap: "8px" }}>
                <button onClick={() => startEdit(b)} style={{ background: "#f5a623", color: "white", border: "none", padding: "6px 14px", borderRadius: "5px", cursor: "pointer" }}>Edit ✏️</button>
                <button onClick={() => handleDelete(b._id, b.fullName)} style={{ background: "#e74c3c", color: "white", border: "none", padding: "6px 14px", borderRadius: "5px", cursor: "pointer" }}>Delete 🗑️</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}