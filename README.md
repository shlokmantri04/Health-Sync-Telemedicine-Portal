# Health-Sync Telemedicine Portal 🩺

A full-stack MERN web application designed for doctors to securely manage patient appointments and track health vitals. The project follows a decoupled architecture with a React frontend, Node.js/Express backend, and MongoDB database.

---

# 🚀 Key Features

* **Authentication & Authorization**
  Secure login and registration using **JWT authentication** with passwords hashed via **bcryptjs**.

* **Decoupled Architecture**
  Independent **React frontend** and **Node.js/Express backend API**.

* **Health Analytics Dashboard**
  Uses **MongoDB Aggregation Pipelines** to calculate metrics such as average heart rate of completed appointments.

* **Responsive User Interface**
  Clean UI built with React and modern CSS styling.

* **Dockerized Application**
  Backend, frontend, and MongoDB are fully containerized using **Docker** and orchestrated with **Docker Compose**.

---

# 🛠️ Technology Stack

### Frontend

* React (Create React App)
* React Router v6
* Axios
* CSS

### Backend

* Node.js
* Express.js
* JWT Authentication
* bcryptjs

### Database

* MongoDB
* Mongoose ODM

### DevOps

* Docker
* Docker Compose

---

# 🐳 Running the Project with Docker (Recommended)

## Prerequisites

Make sure **Docker** and **Docker Compose** are installed.

Check installation:

```
docker --version
docker compose version
```

---

## Start the Application

From the **root directory** (where `docker-compose.yml` is located), run:

```
docker compose up --build
```

Docker will automatically:

* Build the **backend container**
* Build the **frontend container**
* Pull the **MongoDB image**
* Start all services

---

## Access the Application

Frontend

```
http://localhost:3000
```

Backend API

```
http://localhost:5000
```

MongoDB

```
mongodb://localhost:27017
```

---

## Stop the Application

To stop all running containers:

```
docker compose down
```

---

## Rebuild Containers (after code changes)

```
docker compose up --build
```

---

# 💻 Running the Project Without Docker

## Prerequisites

* Node.js (v18+)
* MongoDB (Local or Atlas)

---

## Backend Setup

Create a `.env` file inside the **backend** directory:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/healthsync
JWT_SECRET=super_secret_jwt_key_here
```

Start the backend server:

```
cd backend
npm install
npm run dev
```

---

## Frontend Setup

Open a new terminal:

```
cd frontend
npm install
npm start
```

Frontend will run at:

```
http://localhost:3000
```

---

# ☁️ Deployment

## Backend Deployment (Render)

1. Push the project to GitHub.
2. Create a **MongoDB Atlas cluster**.
3. Create a new **Render Web Service**.
4. Add the required environment variables:

   * `MONGO_URI`
   * `JWT_SECRET`
5. Deploy the backend service.

---

## Frontend Deployment (Vercel)

1. Import the repository into **Vercel**.
2. Set **Root Directory** to:

```
frontend/
```

3. Add environment variable:

```
REACT_APP_API_URL=<backend-url>
```

4. Deploy.


