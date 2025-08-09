# JobBoardApplication
This is a full-stack Job Board application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The platform allows users to browse and apply for jobs, while administrators can manage job listings through a role-based access control system for secure admin login and privileges.

# Setup Instructions
#1 Clone the Repository
git clone https://github.com/Pratik6001/JobBoardApplication.git
#2 Backend Setup
cd Backend,
npm install,
npm run dev

Create a .env file in the Backend/folder:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=3000

#3 Frontend Setup
cd frontend,
npm install,
npm run dev

Create a .env file in the Frontend/folder:
VITE_SERVER_URL=http://localhost:3000

# API Documentation 
Auth Routes
| Method | Endpoint       | Description                   | Auth Required | Role       |
| ------ | -------------- | ----------------------------- | ------------- | ---------- |
| POST   | `/sign`        | Register a new user           | No            | User       |
| POST   | `/login`       | Login user and get JWT token  | No            | User       |
| GET    | `/profile`     | Get logged-in user profile    | Yes           | Admin      |
| GET    | `/das/profile` | Get profile (admin dashboard) | Yes           | Admin      |

Job Routes
| Method | Endpoint        | Description              | Auth Required | Role   |
| ------ | --------------- | ------------------------ | ------------- | ------ |
| GET    | `/jobs`         | Get all job listings     | No            | User   |
| GET    | `/form-count`   | Get total form/job count | No            | User   |
| POST   | `/jobs`         | Create a new job listing | Yes           | Admin  |
| PUT    | `/jobs/:id`     | Update job listing by ID | Yes           | Admin  |
| DELETE | `/jobs/:id`     | Delete job listing by ID | Yes           | Admin  |
| POST   | `/apply/:jobId` | Apply to a job by job ID | No            | User   |

# Tech Stack
Frontend:
React.js
Axios (API requests)
Tailwind CSS 

Backend:
Node.js
Express.js

Database:
MongoDB with Mongoose

Authentication & Security:
JWT Authentication
Role-Based Access Control (RBAC)
bcrypt.js (password hashing)
CORS, dotenv




