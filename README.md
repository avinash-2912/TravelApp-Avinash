# Trip Booking Application

## Table of Contents
- [Introduction](#introduction)
- [Setup Instructions](#setup-instructions)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Application Usage](#application-usage)
- [API Documentation](#api-documentation)
  - [Endpoints](#endpoints)
    - [Trips](#trips)
    - [Bookings](#bookings)
- [Approach and Assumptions](#approach-and-assumptions)

---

## Introduction
The Trip Booking Application is a platform where users can view, book, and manage trips, while organizers can create, edit, and delete their own trips. The application comprises a frontend built with React.js and a backend API using Node.js and Express.js.

---

## Setup Instructions

### Frontend Setup
1. Clone the repository:
   ```bash
   git clone <[repository-url](https://github.com/avinash-2912/TravelApp-Avinash.git)>
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
a. The frontend will be available at `http://localhost:5173` by default.

### Backend Setup
1. Clone the repository:
   ```bash
   git clone <https://github.com/avinash-2912/TravelApp-Avinash.git>
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure the environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     PORT=5000
     MONGO_URI=<your-mongodb-connection-string>
     JWT_SECRET=<your-jwt-secret>
     ```
4. Start the development server:
   ```bash
   nodemon app.js
   ```
5. The backend will be available at `http://localhost:5000` by default.

---

## Application Usage
1. Launch the backend server.
2. Start the frontend development server.
3. Register or log in as a user or organizer.
4. Perform the following actions based on your role:
   - **User**: Browse available trips, view trip details, and book trips.
   - **Organizer**: Create, edit, and delete trips.

---

## API Documentation

### Endpoints

#### Trips
- **GET /trips**
  - Fetches a list of all available trips.
  - **Response**:
    ```json
    [
      {
        "_id": "tripId",
        "title": "Trip Title",
        "location": "Location",
        "startDate": "2024-12-25",
        "price": 300,
        "capacity": 10,
        "organizerId": "organizerId"
      }
    ]
    ```

- **GET /trips/:id**
  - Fetches details of a specific trip.
  - **Response**:
    ```json
    {
      "_id": "tripId",
      "title": "Trip Title",
      "description": "Detailed description of the trip",
      "location": "Location",
      "startDate": "2024-12-25",
      "price": 300,
      "capacity": 10,
      "organizerId": "organizerId"
    }
    ```

- **POST /trips** (Organizer only)
  - Creates a new trip.
  - **Request Body**:
    ```json
    {
      "title": "Trip Title",
      "description": "Detailed description",
      "location": "Location",
      "startDate": "2024-12-25",
      "price": 300,
      "capacity": 10
    }
    ```

- **PUT /trips/:id** (Organizer only)
  - Updates an existing trip.

- **DELETE /trips/:id** (Organizer only)
  - Deletes a trip.

#### Bookings
- **POST /bookings** (User only)
  - Creates a new booking for a trip.
  - **Request Body**:
    ```json
    {
      "tripId": "tripId",
      "count": 2
    }
    ```

- **GET /bookings** (User only)
  - Fetches all bookings made by the user.
 
#### Authentication

- **POST /signup**
  - Registers a new user or organizer.
  - **Request Body**:
    ```json
    {
      "username": "Avinash",
      "email": "avi123@gmail.com",
      "password": "password123",
      "role": "user" // or "organizer"
    }
    ```

- **POST /login**
  - Authenticates a user or organizer and returns a token.
  - **Request Body**:
    ```json
    {
      "email": "avi123@gmail.com",
      "password": "123456"
    }
    ```
---

## Approach and Assumptions
1. **Role-based Access**:
   - Users and organizers have distinct roles.
   - Roles are stored in `localStorage` and verified for appropriate actions.

2. **Security**:
   - JWT is used for authentication.
   - API endpoints are secured based on user roles.

3. **Data Handling**:
   - Trips are stored in a MongoDB database.
   - Booking capacity checks ensure no overbooking.

4. **Frontend-Backend Communication**:
   - Axios is used for API calls.
   - State management ensures smooth transitions between user interactions.


