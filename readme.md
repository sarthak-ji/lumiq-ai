<div align="center">

# Lumiq AI

**An intelligent, real-time AI chat assistant powered by LangChain, Mistral & Gemini.**

Lumiq AI is a full-stack conversational AI platform that delivers smart, context-aware responses with real-time web search capabilities. Built with a modern MERN-style stack, it features secure authentication, persistent chat history, and a sleek, responsive UI.

</div>

---

## ✨ Features

| Feature | Description |
| --- | --- |
| 🤖 **Multi-Model AI** | Leverages **Mistral** and **Google Gemini** via LangChain for high-quality, versatile responses. |
| 🌐 **Web Search Tool** | Integrates **Tavily** search agent so the AI can fetch up-to-date information from the internet. |
| 💬 **Real-Time Chat** | **Socket.io** powered bi-directional communication for instant, streaming-like message delivery. |
| 🔐 **Secure Auth** | JWT-based authentication with HttpOnly cookies, bcrypt password hashing, and protected routes. |
| 🗂️ **Chat History** | Persistent conversations stored in MongoDB with auto-generated chat titles. |
| 🎨 **Modern UI** | Built with **React 19**, **Tailwind CSS 4**, **Redux Toolkit**, and **Lucide** icons. |
| ✉️ **Email Support** | Nodemailer integration for transactional emails (verification, password reset). |
| 🛡️ **Validation & Error Handling** | Zod / Express-Validator schemas with a centralized error-handling middleware. |

---

## 🏗️ Tech Stack

### Frontend
- **React 19** + **Vite 8**
- **Redux Toolkit** & **React-Redux** for state management
- **React Router 7** for client-side routing
- **Tailwind CSS 4** for styling
- **Axios** for HTTP requests
- **Socket.io Client** for real-time messaging
- **Lucide React** for icons

### Backend
- **Node.js** with **Express 5**
- **MongoDB** + **Mongoose 9** for data persistence
- **LangChain** (`@langchain/mistralai`, `@langchain/google-genai`) for LLM orchestration
- **Tavily** (`@tavily/core`) for internet search
- **Socket.io 4** for WebSocket connections
- **JWT** + **bcrypt** for authentication
- **Zod** & **express-validator** for request validation
- **Nodemailer** for email services
- **Morgan** for logging

---

## 📁 Project Structure

```
lumiq-ai/
├── backend/
│   ├── server.js                # Entry point — HTTP + Socket.io server
│   ├── package.json
│   └── src/
│       ├── app.js               # Express app configuration
│       ├── config/              # Database & environment config
│       ├── controllers/         # Route controllers (auth, chat)
│       ├── middlewares/         # Auth & error middlewares
│       ├── models/              # Mongoose models (User, Chat, Message)
│       ├── routes/              # Express routes
│       ├── services/            # AI, Internet search, Mail services
│       ├── sockets/             # Socket.io server logic
│       └── validators/          # Request validation schemas
│
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx
│       ├── app/                 # App shell, routes, store
│       └── features/
│           ├── auth/            # Auth slice, hooks, pages, API
│           └── chat/            # Chat slice, hooks, pages, services
│
└── readme.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** `>= 18.x`
- **npm** or **yarn**
- **MongoDB** (local instance or [MongoDB Atlas](https://www.mongodb.com/atlas) connection string)
- API keys for:
  - [Mistral AI](https://console.mistral.ai/)
  - [Google Gemini](https://aistudio.google.com/apikey)
  - [Tavily](https://tavily.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/sarthak-ji/lumiq-ai.git
cd lumiq-ai
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_jwt_secret

# AI Providers
MISTRAL_API_KEY=your_mistral_api_key
GEMINI_API_KEY=your_gemini_api_key

# Internet Search
TAVILY_API_KEY=your_tavily_api_key

# Mail (Nodemailer)
MAIL_HOST=smtp.example.com
MAIL_PORT=587
MAIL_USER=your_email@example.com
MAIL_PASS=your_email_password

# Client
CLIENT_URL=http://localhost:5173
```

Start the backend:

```bash
npm run dev
```

The API will be live at `http://localhost:8000`.

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file inside `frontend/`:

```env
VITE_API_URL=http://localhost:8000
```

Start the frontend dev server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 🔌 API Endpoints

### Auth — `/api/auth`

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/register` | Register a new user |
| `POST` | `/login` | Login and receive auth cookie |
| `GET` | `/me` | Get the currently authenticated user |
| `POST` | `/logout` | Logout and clear auth cookie |

### Chats — `/api/chats`

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/` | Get all chats for the current user |
| `POST` | `/` | Create a new chat |
| `GET` | `/:id` | Get a single chat with messages |
| `POST` | `/:id/messages` | Send a message and receive an AI reply |
| `DELETE` | `/:id` | Delete a chat |

---

## 🧠 How the AI Agent Works

Lumiq AI uses a **LangChain agent** backed by **Mistral** with a custom tool — `searchInternet` (powered by **Tavily**) — that allows the model to:

1. Reason about whether it needs up-to-date information.
2. Invoke the search tool autonomously.
3. Synthesize a final answer from the search results.

A separate **Gemini** model powers fallback completions, and a lightweight Mistral call generates concise chat titles from the first user message.

---

## 🛠️ Available Scripts

### Backend
| Script | Description |
| --- | --- |
| `npm run dev` | Run the server with **nodemon** (hot-reload) |

### Frontend
| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

---

## 🗺️ Roadmap

- [ ] Streaming responses (token-by-token)
- [ ] File / image upload support (multimodal)
- [ ] Voice input
- [ ] Shareable chat links
- [ ] Team / group chats

---

## 🤝 Contributing

Contributions are welcome and appreciated!

1. **Fork** the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. Open a **Pull Request**

---


## 👤 Author

**Sarthak**
- GitHub: [@sarthak-ji](https://github.com/sarthak-ji)

---

<div align="center">

If you like this project, please consider giving it a ⭐ on GitHub!

</div>
