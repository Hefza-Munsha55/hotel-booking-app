import BookingForm from "./BookingForm";
import BookingList from "./BookingList";
import "./App.css";
export default function App() {
  return (
    <div>
      <h1 className="app-title">
        <span className="hotel-icon">🏨</span> <span className="title-text">Hotel Booking App</span>
      </h1>
      <BookingForm />
      <BookingList />
    </div>
  );
}