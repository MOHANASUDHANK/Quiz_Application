# MERN Role-Based Quiz Application

A full-stack, role-based Quiz Application built with the **MERN** stack (MongoDB, Express, React, Node.js). It provides specialized workflows for three distinct user roles: **Admin**, **Teacher**, and **Student**, with secure authentication and interactive features.

## 🚀 Features

### General
- **Role-Based Access Control (RBAC)**: Distinct permissions and views for Admins, Teachers, and Students.
- **Secure Authentication**: User registration and login utilizing JSON Web Tokens (JWT) and `bcrypt` for password hashing.
- **Responsive & Dynamic UI**: Built with React (Vite) and customized CSS for a modern, visually appealing experience.

### User Roles
1. **Admin**
   - **Admin Dashboard**: Overview of system statistics.
   - **Staff Management**: Ability to add, remove, and manage Teacher accounts.
2. **Teacher**
   - **Teacher Dashboard**: Overview of quizzes created by the teacher.
   - **Quiz Management**: Create new quizzes, define categories, and manage settings.
   - **Question Management**: Add, edit, and delete multiple-choice questions for specific quizzes.
3. **Student**
   - **Quiz Hub**: Browse available quizzes.
   - **Live Quiz Attempt**: Take quizzes with a live, interactive timer.
   - **Results & Feedback**: Immediate result calculation and display upon submission.
   - **Leaderboard**: View top scores and rankings for quizzes.

---

## 🛠️ Technology Stack

### Frontend
- **React.js** (Bootstrapped with Vite)
- **React Router DOM** (Client-side routing)
- **Axios** (HTTP client for API requests)
- **Vanilla CSS** (Component-scoped and global styling system)

### Backend
- **Node.js & Express.js** (Server framework)
- **MongoDB & Mongoose** (Database and ODM)
- **JSON Web Token (JWT)** (Authentication)
- **Bcrypt** (Password hashing)
- **Cors & Dotenv** (Middleware and environment configuration)

---

## 📂 Project Structure

```text
Quiz_Application/
├── backend/                  # Node.js + Express Backend Server
│   ├── controllers/          # Request handlers (business logic)
│   ├── middleware/           # Custom middlewares (e.g., auth verification)
│   ├── models/               # Mongoose schemas (User, Quiz, Question, Result)
│   ├── routes/               # Express API routes
│   │   ├── authRoutes.js     # /auth
│   │   ├── quizRoutes.js     # /quiz
│   │   ├── questionRoutes.js # /question
│   │   ├── resultRoutes.js   # /result
│   │   └── userRoutes.js     # /user
│   ├── .env                  # Backend environment variables
│   └── server.js             # Entry point for backend app
│
└── frontend/                 # React + Vite Frontend Application
    ├── src/
    │   ├── api/              # Axios instances & API service calls
    │   ├── assets/           # Static assets (images, icons)
    │   ├── auth/             # Context/Providers for authentication state
    │   ├── components/       # Reusable UI components (e.g., Navbar)
    │   ├── pages/            # Page-level components
    │   │   ├── AdminDashboard, StaffManagement
    │   │   ├── TeacherDashboard, CreateQuiz, AddQuestions
    │   │   ├── QuizList, QuizAttempt, Result, Leaderboard
    │   │   └── Login, Register
    │   ├── styles/           # Global and modular CSS stylesheets
    │   ├── App.jsx           # Main React component & Routing setup
    │   └── main.jsx          # React DOM render entry
    ├── package.json          # Frontend dependencies
    └── vite.config.js        # Vite bundler configuration
```

---

## 💻 Local Setup & Installation

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- [MongoDB](https://www.mongodb.com/) installed locally or a MongoDB Atlas URI

### 1. Clone the repository
```bash
git clone <repository-url>
cd Quiz_Application
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory with the following variables:
```env
PORT=5000
MONGO_DB=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Start the backend server:
```bash
npm start
# Server will run on http://localhost:5000
```

### 3. Frontend Setup
Open a new terminal window:
```bash
cd frontend
npm install
```

Start the frontend Vite development server:
```bash
npm run dev
# Application will run typically on http://localhost:5173
```

---

## 🔌 Core API Endpoints

### Authentication (`/auth`)
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Authenticate user and return JWT

### Users (`/user`)
- `GET /user/teachers` - Get all teachers (Admin only)
- `POST /user/add-teacher` - Create a teacher account (Admin only)
- `DELETE /user/:id` - Delete a user account (Admin only)

### Quizzes (`/quiz`)
- `POST /quiz/create` - Create a new quiz (Teacher only)
- `GET /quiz/all` - Get all quizzes
- `GET /quiz/teacher/:teacherId` - Get quizzes by specific teacher
- `GET /quiz/:quizId` - Get quiz details

### Questions (`/question`)
- `POST /question/add` - Add a question to a quiz (Teacher only)
- `GET /question/quiz/:quizId` - Get all questions for a specific quiz

### Results (`/result`)
- `POST /result/submit` - Submit quiz answers and calculate score
- `GET /result/leaderboard/:quizId` - Get top scores for a quiz
- `GET /result/user/:userId` - Get user's past quiz results

---

## 🤝 Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request