# Student Mental Health Score Prediction

A machine learning project that estimates a student's mental health score using lifestyle habits and survey-related features.

## Features

- Predicts a numerical score using a trained regression model.
- FastAPI backend for model inference.
- HTML, CSS, and JavaScript frontend.
- Dynamic form options served by the API.
- Input validation through Pydantic.

## Tech Stack

- Python
- Pandas and NumPy
- Scikit-learn
- FastAPI and Uvicorn
- HTML, CSS, JavaScript

## Run Locally

1. Clone this repository.
2. Create and activate a Python virtual environment.
3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Start the backend:

   ```bash
   python -m uvicorn main:app --reload
   ```

5. Open http://127.0.0.1:8000 in your browser.

API documentation is available at http://127.0.0.1:8000/docs.

## Disclaimer

This project produces a statistical estimate based on patterns in the dataset. It is not a medical diagnosis or a substitute for professional mental health support.

## Model and Dataset

The trained model and dataset are included only if permitted by their applicable licenses and distribution terms.
