# 🎮 Retro Game Trivia

A lightweight, containerized trivia microservice and static frontend for retro video game enthusiasts.  
Built with **FastAPI**, deployed on **Render**, and paired with a static **JavaScript SPA** hosted on **GitHub Pages**.

---

## 📖 Overview
Retro Game Trivia fetches random retro gaming questions from the free [Open Trivia Database (OpenTDB)](https://opentdb.com/), cleans up the data, and returns it via a simple JSON API.  
The frontend consumes the API and presents an interactive quiz interface.

---

## 🚀 Live Demo
- **Frontend (GitHub Pages)**: https://skycodepilot.github.io/retro-game-trivia  
- **Backend (Render)**: https://retro-game-trivia.onrender.com/trivia

---

## 🛠 Technology Stack
- **Backend**: [FastAPI](https://fastapi.tiangolo.com/)
- **Frontend**: HTML, CSS, Vanilla JavaScript
- **Data Source**: OpenTDB API
- **Containerization**: Docker
- **Hosting**: Render (API), GitHub Pages (frontend)
- **CORS Management**: Environment-aware configuration via `python-dotenv`

---

## 📦 Quickstart

### Clone the repo
`bash`

`git clone https://github.com/skycodepilot/retro-game-trivia.git`

`cd retro-game-trivia`

### Install backend dependencies
`pip install -r requirements.txt`

### Run backend locally
`uvicorn app.main:app --reload`
(IF you run into problems running uvicorn locally, fallback to executing `python -m uvicorn` instead of `uvicorn`)

### Backend will be available at:
http://127.0.0.1:8000

### 4️⃣ View frontend locally
Use a local server (e.g., VS Code Live Server) and open:
http://localhost:5500
(I ran `python -m http.server 5500` from a terminal window to do this)

### 🧩 API Usage
Endpoint:
GET /trivia
Query Parameters:
* count — number of questions (1–10)
* difficulty — easy, medium, or hard (optional)

Example: 

`GET /trivia?count=5&difficulty=easy`

Sample Response:

`[
  {
    "question": "In Super Mario Bros., what is Mario's brother's name?",
    "correct_answer": "Luigi",
    "incorrect_answers": ["Wario", "Toad", "Yoshi"]
  }
]`

### 🐳 Docker
Build and run with Docker:

`docker build -t retro-trivia .`

`docker run -p 8000:8000 retro-trivia`

(Don't forget to turn on or have Docker running prior to doing this ;) )

### 🔒 CORS Handling
Development: I was tempted to set `allow_origins=["*"]` for painless local testing, but have some addresses added so you know what allowed origins are (they're local)
Production: Explicit trusted domains (GitHub Pages URL) set via .env.

### 📝 Deployment
Frontend: Push to master branch → GitHub Pages auto-updates.
Backend: Re-deploy manually on Render after Python code changes. (**IMPORTANT** - make sure you're re-deploying if you did anything to those Python files!)

### ⚠️ Known Limitations
Relies on OpenTDB API availability.

No persistent score tracking (stateless).

GitHub Pages refresh delay after commits.





