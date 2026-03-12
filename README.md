# Health-Sync Telemedicine Portal 🩺

A full-stack, decoupled MERN web application engineered for doctors to manage patient appointments securely and track real-time health metrics.

## 🚀 Key Features

*   **Authentication & Authorization:** Secure, stateful JSON Web Token (JWT) based login and registration flows for doctors. Passwords hashed robustly using `bcryptjs`.
*   **Decoupled Architecture:** Clean separation of concerns with a standalone Node.js/Express backend API and an independent React.js frontend interface.
*   **Intelligent Dashboard:** Advanced MongoDB Aggregation Pipelines to dynamically calculate health telemetry (e.g., averaging the heart rate of all completed appointments).
*   **Responsive UI/UX:** Clean, modern interface designed with bespoke CSS, utilizing Apple-esque design principles, rounded contours, and smooth component transitions.
*   **Fully Dockerized:** Complete multi-stage Dockerfiles configured for both the backend (Alpine Node) and frontend (Nginx proxy shell). Ready for one-click cloud orchestration.

## 🛠️ Technology Stack

*   **Frontend:** React (Create React App), React Router V6, Axios, Vanilla CSS.
*   **Backend:** Node.js, Express.js, JSON Web Tokens (JWT), bcryptjs.
*   **Database:** MongoDB Atlas (Mongoose ODM).
*   **DevOps:** Docker, Docker Compose. Hosted via **Render** (Backend) and **Vercel** (Frontend).

## 💻 Local Development

### Prerequisites
*   Node.js (v18+)
*   Docker & Docker Compose (Optional)
*   A MongoDB Instance (Local or Atlas)

### 1. Environment Variables Setup
Create a `.env` file in the **`/backend`** directory with the following variables:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/healthsync
JWT_SECRET=super_secret_jwt_key_here
```

### 2. Running via Docker-Compose (Easiest)
From the root directory, simply run:
```bash
docker-compose up --build
```
> * The frontend will be available at `http://localhost:3000`
> * The backend API will be available at `http://localhost:5000`

### 3. Running Manually
**Start the Backend:**
```bash
cd backend
npm install
npm run dev
```

**Start the Frontend:**
Open a new terminal session.
```bash
cd frontend
npm install
npm start
```

## ☁️ Deployment

### Render (Express Backend & MongoDB)
1. Push the repository to GitHub.
2. Sign up for a free MongoDB Atlas cluster and acquire your `MONGO_URI`.
3. Create a **New Blueprint** on Render.com connected to your repository.
4. Render will seamlessly read the included `render.yaml` configuration file to automatically provision and build your Express Docker container. Provide your `MONGO_URI` when prompted.

### Vercel (React Frontend)
1. Import the repository into Vercel as a new Project.
2. Ensure you change the **Root Directory** setting to `frontend/`.
3. Add a new Environment Variable: `REACT_APP_API_URL` matching your newly generated Render Backend URL.
4. Deploy! Vercel will install dependencies and optimize the React build instantly across its edge network.


