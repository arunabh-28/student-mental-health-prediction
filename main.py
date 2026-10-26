from pathlib import Path
from typing import Literal

import joblib
import pandas as pd
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field, field_validator

BASE_DIR = Path(__file__).resolve().parent
FRONTEND_DIR = BASE_DIR

bundle = joblib.load(BASE_DIR / "Mental_Health_Model.pkl")
pipeline = bundle["pipeline"]
top_countries = set(bundle["top_countries"])
options = bundle["options"]


class StudentInput(BaseModel):
    Age: int = Field(ge=10, le=100)
    Gender: str
    Academic_Level: str
    Country: str
    Avg_Daily_Usage_Hours: float = Field(ge=0, le=24)
    Most_Used_Platform: str
    Purpose_Of_Use: str
    Daily_Unlocks: int = Field(ge=0, le=1000)
    Study_Hours: float = Field(ge=0, le=24)
    Sleep_Hours_Per_Night: float = Field(ge=0, le=24)
    Physical_Activity_Hours: float = Field(ge=0, le=24)
    Stress_Level: Literal["Low", "Medium", "High", "Very High"]

    @field_validator("Gender", "Academic_Level", "Country", "Most_Used_Platform", "Purpose_Of_Use")
    @classmethod
    def must_be_known(cls, value, info):
        if value not in options[info.field_name]:
            raise ValueError(f"'{value}' is not a known {info.field_name} value")
        return value


class PredictionOut(BaseModel):
    mental_health_score: float


app = FastAPI(title="Student Mental Health Score API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/options")
def get_options():
    return options


@app.post("/predict", response_model=PredictionOut)
def predict(data: StudentInput):
    row = data.model_dump()
    row["Grouped_Country"] = row["Country"] if row["Country"] in top_countries else "Other"
    del row["Country"]
    score = float(pipeline.predict(pd.DataFrame([row]))[0])
    return PredictionOut(mental_health_score=round(min(max(score, 0.0), 10.0), 2))


app.mount("/", StaticFiles(directory=FRONTEND_DIR, html=True), name="frontend")
