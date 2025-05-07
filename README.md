Activity Booking Backend

A simple Node.js/Express backend for booking activities. Integrates easily with a Flutter app.

Project Structure

backend/
├── models/ Mongoose schemas
├── routes/ API routes
├── .env Env variables
└── server.js App entrypoint

Prerequisites

Node.js & npm

MongoDB (Atlas or local)


Setup

1. Clone & install
git clone <repo-url>
cd backend
npm install


2. .env
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
PORT=5000


3. Run
npm start



API Endpoints

Method Route Auth Body
POST /api/auth/register No { name, email, password, phone }
POST /api/auth/login No { email, password }
GET /api/activities No —
POST /api/activities Yes { title, description, date, location }
POST /api/bookings/:activityId Yes —
GET /api/bookings Yes —

Quick Postman Test

1. Login → get token


2. Header: Authorization: Bearer <token>


3. GET http://localhost:5000/api/activities


4. POST http://localhost:5000/api/activities (with JSON body)
