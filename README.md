# Student Mental Health Score Prediction

A machine learning project that explores the relationship between students' digital habits, daily routines, stress levels, and mental health scores.

## Overview

Students' well-being can be influenced by several aspects of their daily lives, including social media usage, sleep, academic routines, and stress. This project uses supervised machine learning to analyze patterns in student survey data and predict a numerical mental health score based on selected lifestyle and demographic features.

The project combines a trained regression model with a FastAPI backend and a web-based interface to make predictions interactive.

## Key Features

- **Machine Learning:** Regression models trained to predict numerical mental health scores.
- **Model Comparison:** Evaluation of Linear Regression and Random Forest models.
- **Hyperparameter Tuning:** RandomizedSearchCV with cross-validation to explore Random Forest configurations.
- **Data Preprocessing:** Handling numerical, categorical, and ordinal features through a preprocessing pipeline.
- **Prediction API:** FastAPI endpoint for generating predictions from user inputs.
- **Interactive Web Interface:** HTML, CSS, and JavaScript frontend with dynamically populated form options.
- **Input Validation:** Pydantic validation to check incoming prediction requests.

## Machine Learning Approach

The project follows a supervised regression workflow:

1. **Data Preparation** — Load the dataset, remove duplicate records, and prepare relevant features.
2. **Feature Engineering** — Group less frequent countries into an `Other` category and encode categorical and ordinal variables.
3. **Preprocessing Pipeline** — Apply transformations to numerical, categorical, and ordinal features.
4. **Model Training** — Train Linear Regression and Random Forest regression models.
5. **Model Evaluation** — Compare model performance using R², Mean Absolute Error (MAE), and Root Mean Squared Error (RMSE).
6. **Model Selection** — Select a candidate model based on test-set R².
7. **Deployment Interface** — Integrate the saved model with FastAPI and a web frontend.

## Model Performance

On the project's current train-test split, the models achieved the following results:

| Model | Test R² | Test MAE |
|---|---:|---:|
| Linear Regression | 0.743 | 0.534 |
| Random Forest (Default) | **0.890** | **0.327** |
| Random Forest (Tuned) | 0.876 | 0.353 |

The default Random Forest achieved the strongest test-set performance among the three evaluated models. Its test R² was 0.890, with an MAE of 0.327 score points.

These results reflect the current dataset and evaluation split; they do not establish performance on all student populations or real-world clinical outcomes.

## Technology Stack

- **Language:** Python
- **Data Analysis:** Pandas, NumPy
- **Machine Learning:** Scikit-learn
- **Model Persistence:** Joblib
- **Backend:** FastAPI, Pydantic, Uvicorn
- **Frontend:** HTML, CSS, JavaScript
- **Development & Analysis:** Jupyter Notebook

## Project Structure

```text
Student-Mental-Health-Prediction/
├── main.py
├── Mental_Health_Model.pkl
├── requirements.txt
├── index.html
├── style.css
├── script.js
├── train_model.ipynb
└── .gitignore
```

*The structure above represents the core application files; include the dataset file if it is part of the repository.*

## Future Improvements

- Evaluate generalization using repeated cross-validation and additional unseen data.
- Investigate feature importance and prediction sensitivity.
- Compare additional regression algorithms and preprocessing strategies.
- Improve model interpretability and prediction uncertainty reporting.
- Expand testing and validation of the API and frontend.

## Project Goal

The goal is to demonstrate an end-to-end machine learning workflow—from survey-data preprocessing and regression model evaluation to API integration and an interactive application.


