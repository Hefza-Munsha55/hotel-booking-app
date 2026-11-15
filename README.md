# 🏨 Hotel Booking App

> A modern, full-stack hotel booking platform — browse rooms, check availability, and book your stay in seconds.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_Site-brightgreen?style=for-the-badge&logo=vercel)](https://hotel-booking-app-frontend-theta.vercel.app)
[![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=nodedotjs)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/)

**Live Demo:** https://hotel-booking-app-frontend-theta.vercel.app  
**Backend API:** https://hotel-booking-backend-omega-nine.vercel.app

---

## 📸 Preview

| Home Page | Booking Form |
| :---: | :---: |
| ![Home](./screenshots/home.png) | ![Booking](./screenshots/booking.png) |

---

## ✨ Features

- Browse available hotel rooms with images & pricing
- Real-time booking with name, dates & guest details
- View & manage all bookings instantly
- Fully responsive — works on mobile, tablet & desktop
- Fast performance with Vite + React
- REST API connected Frontend to Backend
- Deployed on Vercel with live MongoDB

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React.js, Vite, JavaScript, CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose |
| **Deployment** | Vercel |
| **Tools** | Git, GitHub, VS Code |

---

## 📁 Project Structure

```bash
hotel-booking-app/
├── frontend/          # React + Vite App
│   ├── src/
│   ├── .env
│   └── package.json
├── backend/           # Node + Express API
│   ├── models/
│   ├── routes/
│   ├── .env
│   └── package.json
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

```bash
Node.js v18+
MongoDB Atlas account
Git
```

### 1. Clone the Repository

```bash
git clone https://github.com/Hefza-Munsha55/hotel-booking-app.git
cd hotel-booking-app
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file in `backend/` folder:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Run backend:

```bash
npm start
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create `.env` file in `frontend/` folder:

```env
VITE_API_URL=http://localhost:5000
```

Run frontend:

```bash
npm run dev
```

App will run at: `http://localhost:5173`

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/bookings` | Get all bookings |
| `POST` | `/api/bookings` | Create a new booking |
| `GET` | `/api/rooms` | Get all rooms |
| `DELETE` | `/api/bookings/:id` | Delete a booking |

### Example Request

```bash
POST /api/bookings
```

```json
{
  "name": "Hefza Munsha",
  "room": "Deluxe Room",
  "checkIn": "2026-11-20",
  "checkOut": "2026-11-22",
  "guests": 2
}
```

---

## 🌐 Deployment

```bash
Frontend: Deployed on Vercel from frontend/ folder
Backend: Deployed on Vercel from backend/ folder
```

Environment Variable on Vercel:

```env
VITE_API_URL=https://hotel-booking-backend-omega-nine.vercel.app
```

---

## 🔮 Future Improvements

- [ ] User Authentication & Login
- [ ] Payment Integration (Stripe / JazzCash)
- [ ] Room Search & Filters
- [ ] Admin Dashboard
- [ ] Email Confirmation on Booking

---

## 👩‍💻 Author

**Hefza Munsha**

- GitHub: https://github.com/Hefza-Munsha55
- LinkedIn: www.linkedin.com/in/hefza-munsha-4a1b35381
- Project: Hotel Booking App

---

## ⭐ Show Your Support

If you liked this project, please give it a ⭐ on GitHub — it means a lot!

---

## 📄 License

This project is open source and available under the MIT License.
