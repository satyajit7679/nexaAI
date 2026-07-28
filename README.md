# 🚀 nexaAI

<div align="center">

### AI-Powered Multi-Service Platform Built with MERN, React, Node.js, MongoDB & Redis

A modern AI assistant inspired by ChatGPT that supports AI Chat, Coding Assistant, PDF Analysis, Billing Management, Vision AI, and AI Search using a scalable Microservices Architecture.

</div>

---

# ✨ Features

- 🤖 AI Chat Assistant
- 💻 Coding Assistant
- 📄 PDF Analysis
- 📊 Billing Management
- 🔍 AI Search
- 🖼 Vision AI
- 🔐 Google Authentication
- 💬 Chat History
- ⚡ Streaming Responses
- 📱 Responsive UI
- 🐳 Docker Support
- ☁️ Cloud Deployment Ready

---

# 🛠 Tech Stack

## Frontend

- React 19
- Vite
- Redux Toolkit
- React Router
- Axios
- Tailwind CSS

## Backend

- Node.js
- Express.js
- MongoDB
- Redis
- JWT Authentication

## DevOps

- Docker
- Docker Compose
- GitHub
- Render

---

# 📂 Project Structure

```text
nexaAI/
│
├── .github/
│
├── backend/
│   │
│   ├── gateway/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── utils/
│   │   │   └── proxyWithHeader.js
│   │   ├── Dockerfile
│   │   ├── index.js
│   │   ├── package.json
│   │   └── .env
│   │
│   ├── services/
│   │   ├── agent/
│   │   ├── auth/
│   │   ├── billing/
│   │   └── chat/
│   │
│   ├── shared/
│   │   └── redis/
│   │
│   ├── docker-compose.yml
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Artifact.jsx
│   │   │   ├── BillingDrawer.jsx
│   │   │   ├── ChatArea.jsx
│   │   │   ├── ChatInput.jsx
│   │   │   ├── LoadingAnimation.jsx
│   │   │   ├── Main.jsx
│   │   │   ├── MessageBubble.jsx
│   │   │   ├── MessageList.jsx
│   │   │   ├── Nav.jsx
│   │   │   └── SideBar.jsx
│   │   │
│   │   ├── features/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
├── package.json
└── README.md
```

---

# 🏗 Architecture

```
                        +-----------------------+
                        |     React Frontend    |
                        |       (Vite)          |
                        +-----------+-----------+
                                    |
                              HTTP Requests
                                    |
                                    ▼
                     +----------------------------+
                     |        API Gateway         |
                     | Authentication             |
                     | Routing                    |
                     | Middleware                 |
                     +-------------+--------------+
                                   |
          ---------------------------------------------------
          |                  |                |              |
          ▼                  ▼                ▼              ▼
   Agent Service      Auth Service    Chat Service   Billing Service
          |                  |                |              |
          -------------------+----------------+--------------
                              |
                        Shared Redis Layer
                              |
                              ▼
                           MongoDB
```

---

# 📁 Folder Description

## Frontend

The frontend is built using **React + Vite**.

### assets/

Contains

- Images
- Icons
- Static files

---

### components/

Reusable UI components.

| Component | Description |
|------------|-------------|
| Main.jsx | Main chat layout |
| SideBar.jsx | Sidebar with chat history |
| Nav.jsx | Top navigation |
| ChatArea.jsx | Displays AI conversation |
| ChatInput.jsx | User input box |
| MessageList.jsx | List of messages |
| MessageBubble.jsx | Individual message |
| LoadingAnimation.jsx | AI typing animation |
| BillingDrawer.jsx | Billing panel |
| Artifact.jsx | AI generated artifacts |

---

### redux/

Global application state.

Stores

- User
- Authentication
- Chats
- Messages
- Billing

---

### pages/

Contains page-level components.

Example

- Home
- Login
- Dashboard

---

### features/

Business logic grouped by features.

---

### utils/

Frontend helper functions.

---

# Backend

Backend follows **Microservices Architecture**.

---

## Gateway

Acts as the entry point.

Responsibilities

- Authentication
- Route Management
- API Proxy
- Middleware
- Error Handling
- Validation

Contains

```
controllers/
middleware/
utils/
proxyWithHeader.js
```

---

## Services

Each service is independent.

### Agent Service

Responsible for

- AI Requests
- Prompt Processing
- LLM Integration

---

### Auth Service

Responsible for

- Login
- Signup
- Google OAuth
- JWT

---

### Chat Service

Responsible for

- Chat History
- Conversations
- Messages

---

### Billing Service

Responsible for

- User Billing
- AI Usage
- Payment Tracking

---

## Shared

Contains shared resources.

Current

```
Redis
```

Used for

- Cache
- Sessions
- Rate Limiting

---

# Request Flow

```
User

↓

React Frontend

↓

API Gateway

↓

Authentication

↓

Requested Service

↓

Redis Cache

↓

MongoDB

↓

Gateway

↓

Frontend
```

---

# Authentication Flow

```
Google Login

↓

Gateway

↓

Auth Service

↓

JWT Token

↓

Frontend

↓

Protected APIs
```

---

# Installation

Clone repository

```bash
git clone https://github.com/yourusername/nexaAI.git
```

```
cd nexaAI
```

---

## Install Backend

```bash
cd backend

npm install
```

---

## Install Gateway

```bash
cd gateway

npm install
```

---

## Install Frontend

```bash
cd frontend

npm install
```

---

# Environment Variables

## Backend

```env
PORT=

MONGODB_URI=

JWT_SECRET=

REDIS_URL=

GOOGLE_CLIENT_ID=

GOOGLE_CLIENT_SECRET=

GEMINI_API_KEY=
```

---

## Frontend

```env
VITE_API_URL=

VITE_FIREBASE_API_KEY=

VITE_FIREBASE_AUTH_DOMAIN=

VITE_FIREBASE_PROJECT_ID=
```

---

# Running Project

Frontend

```bash
npm run dev
```

Backend

```bash
npm run dev
```

Gateway

```bash
npm run dev
```

---

# Docker

Build

```bash
docker compose build
```

Run

```bash
docker compose up
```

Stop

```bash
docker compose down
```

---

# Security

- JWT Authentication
- Google OAuth
- Route Protection
- API Validation
- Rate Limiting
- Redis Session Storage

---

# Future Roadmap

- Voice Assistant
- AI Agents
- Multiple LLM Support
- Image Generation
- Video Generation
- Workspace Support
- Real-time Collaboration
- Mobile Application
- WebSocket Streaming
- Plugin Marketplace



# Contributing

1. Fork the repository

2. Create a branch

```bash
git checkout -b feature/new-feature
```

3. Commit

```bash
git commit -m "Added new feature"
```

4. Push

```bash
git push origin feature/new-feature
```

5. Open Pull Request

---

# Author

## Satyajit Barik

**MCA Student | Full Stack Developer | AI Enthusiast**

GitHub

https://github.com/satyajit7679

---

# License

MIT License

---

<div align="center">

⭐ If you found this project helpful, please give it a star on GitHub!

Built with ❤️ using React, Node.js, MongoDB, Redis and AI.

</div>
