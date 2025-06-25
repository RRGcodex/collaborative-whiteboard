# collaborative-whiteboard
A real-time collaborative whiteboard app built with the MERN stack and Socket.IO. Features include drawing tools, multi-user support via rooms, live sync, canvas export, and more.

## 🚀 Live Demo

[View Live Demo](https://collaborative-whiteboard-8jks.onrender.com/)

---

## ✨ Features

- 🖌️ Real-time collaborative whiteboard
- 👥 Live drawing with multiple users
- 🔲 Shape drawing (rectangles, circles, lines)
- 📤 Export board to image
- 🔐 Multi-user sessions with access control
- 💬 Real-time chat functionality

---

## 📦 Installation

Make sure you have **Node.js** and **npm** installed.

Clone the repository and install dependencies:

```bash
git clone https://github.com/RRGcodex/collaborative-whiteboard
```

### Backend Setup

```bash
cd backend
npm install
```

### Frontend Setup

```bash
cd ../frontend
npm install
```

---

## ▶️ Running the Application

To start both the frontend and backend, open two terminal windows:

### Terminal 1 - Backend

```bash
cd backend
npm run dev
```

### Terminal 2 - Frontend

```bash
cd frontend
npm run dev
```

---

## 🔐 Environment Variables

### Backend `.env`

Create a `.env` file in the `backend` directory with the following:

```
PORT=3000
```

### Frontend `.env`

Create a `.env` file in the `frontend` directory:

```
VITE_API_URL=http://localhost:3000
```

---

## 🛠 Technologies Used

- **Frontend**: React, Tailwind CSS, Axios
- **Backend**: Node.js, Express, MongoDB
- **Real-Time**: Socket.io

---

## 🤝 Contributing

We welcome contributions! If you have suggestions or want to add new features:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Create a pull request

Make sure to update tests where applicable.
