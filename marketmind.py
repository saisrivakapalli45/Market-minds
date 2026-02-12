from fastapi import FastAPI
import openai
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Set OpenAI API Key
openai.api_key = os.getenv("OPENAI_API_KEY")

# Create FastAPI app
app = FastAPI(
    title="MarketMind",
    description="Generative AI Powered Sales & Marketing Intelligence Platform",
    version="1.0"
)

# ---------------- AI LOGIC ----------------
def generate_marketing_insight(objective: str):
    prompt = f"""
    You are a Sales and Marketing Intelligence AI.

    Based on the objective below, provide:
    1. Target Audience
    2. Best Marketing Channels
    3. Campaign Idea

    Objective:
    {objective}
    """

    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "user", "content": prompt}
        ]
    )

    return response.choices[0].message.content

# ---------------- API ROUTE ----------------
@app.post("/generate-campaign")
def generate_campaign(objective: str):
    insight = generate_marketing_insight(objective)
    return {
        "objective": objective,
        "ai_insight": insight
    }

# ---------------- ROOT ----------------
@app.get("/")
def home():
    return {
        "message": "Welcome to MarketMind – AI Sales & Marketing Intelligence Platform"
    }
