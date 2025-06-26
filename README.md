# 🎓 EduZone – MERN Stack LMS

**EduZone** is a modern, full-stack **Learning Management System (LMS)** built using the **MERN stack** — **MongoDB**, **Express.js**, **React.js**, and **Node.js**.
This monorepo includes both the **frontend client** and the **backend API**, designed to support students, teachers, and administrators with a seamless learning experience.

---

## 📁 Project Structure

```
EduZone/
├── client/       # React.js Client – LMS Frontend
├── server/       # Node.js + Express – Backend API
└── README.md              # Project Overview & Setup Guide
```

---

## 🚀 Getting Started

### ✅ Prerequisites

Ensure the following tools are installed on your system:

- [Node.js](https://nodejs.org/) (v18 or later)
- [MongoDB](https://www.mongodb.com/cloud/atlas) (local or cloud)
- [Git](https://git-scm.com/)

---

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/SoftEngMuhammadAli/EduZone.git
cd EduZone
```

---

### 2. Setup & Run the Backend

```bash
cd server
npm install
npm run dev
```

🔐 Create a `.env` file in the `server/` directory with the following content:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_SECRET_KEY
```

---

### 3. Setup & Run the Frontend

```bash
cd ../client
npm install
npm start
```

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:5000](http://localhost:5000)

Ensure both frontend and backend servers are running simultaneously.

---

## 💻 Tech Stack

| Layer     | Technologies                            |
| --------- | --------------------------------------- |
| Frontend  | React.js, React Router, Axios           |
| Backend   | Node.js, Express.js, JWT Authentication |
| Database  | MongoDB, Mongoose                       |
| Dev Tools | Git, VS Code, Postman                   |

---

## ✨ Key Features

- 🔐 **JWT-based Authentication & Authorization**
- 📚 **Course Management** – Add, update, and remove courses
- 🧑‍🏫 **Role-Based Dashboards** – Separate interfaces for Admin, Teacher, and Student
- 📝 **Assignments & Quizzes** – Create and manage learning tasks
- 📊 **Progress Tracking** – Visualize student performance

---

## 🚧 Project Status

| Module       | Status         |
| ------------ | -------------- |
| Folder Setup | ✅ Completed   |
| Backend API  | ⚙️ In Progress |
| Frontend UI  | ⚙️ In Progress |

---

## 🤝 Contributing

We welcome contributions from the community!

1. **Fork** the repository
2. **Create** your feature branch:

   ```bash
   git checkout -b feature-name
   ```

3. **Commit** your changes:

   ```bash
   git commit -m "Add feature"
   ```

4. **Push** the branch:

   ```bash
   git push origin feature-name
   ```

5. **Open a Pull Request**

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---
