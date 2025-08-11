from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import requests
import html
import random

app = FastAPI(
    title = "Retro Game Trivia API",
    description = "A microservice that returns retro video game trivia.",
    version = "1.0.0"
)

origins = [
    # "http://localhost:5500", # Locally-hosted testing (uncomment this to test locally)
    "https://skycodepilot.github.io",  # GitHub Pages root
    "https://skycodepilot.github.io/retro-game-trivia",  # if hosted in repo subpath
    "https://skycodepilot.github.io/retro-game-trivia/frontend",  # in case this is required
    "https://retro-game-trivia.onrender.com"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # or ["*"] for all
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

OPENTDB_URL = "https://opentdb.com/api.php"

@app.get("/trivia")
def get_trivia(
    count: int = Query(5, ge = 1, le = 10, description = "Number of trivia questions"),
    difficulty: str = Query(None, regex = "^(easy|medium|hard)?$", description = "Question difficulty")
):
    params = {
        "amount": count,
        "category": 15, # Category for Video Games
        "type": "multiple"
    }
    if count:
        params["count"] = count
    if difficulty:
        params["difficulty"] = difficulty

    response = requests.get(OPENTDB_URL, params = params)
    data = response.json()

    if data["response_code"] != 0:
        return {"error": "Failed to fetch trivia"}
    
    questions = []
    for item in data["results"]:
        question_text = html.unescape(item["question"])
        correct = html.unescape(item["correct_answer"])
        incorrect = [html.unescape(ans) for ans in item["incorrect_answers"]]

        options = incorrect + [correct]
        random.shuffle(options)

        questions.append({
            "question": question_text,
            "options": options,
            "answer": correct
        })

    return {"questions": questions}