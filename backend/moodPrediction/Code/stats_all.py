import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from statsmodels.tsa.ar_model import AutoReg
from statsmodels.tsa.arima.model import ARIMA
from statsmodels.tsa.api import VAR
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import classification_report

# Function to encode features for statistical models
# Encodes events and emotions using LabelEncoder
# Returns encoded events and emotions as numpy arrays
def encode_features(events, emotions):
    event_encoder = LabelEncoder()
    emotion_encoder = LabelEncoder()
    events = ['|'.join(e) if isinstance(e, list) else e for e in events] # Need to flatten lists in events
    encoded_events = event_encoder.fit_transform(events)
    encoded_emotions = emotion_encoder.fit_transform(emotions)
    return encoded_events, encoded_emotions

# Function to prepare a DataFrame for statistical models
# Takes lists of events, emotions, sleep scores, and mood scores
# Encodes events and emotions, then creates a DataFrame with these features
# Returns the DataFrame ready for modeling
def prepare_dataframe(events, emotions, sleep, mood):
    encoded_events, encoded_emotions = encode_features(events, emotions)
    return pd.DataFrame({
        "event": encoded_events,
        "emotion": encoded_emotions,
        "sleep": sleep,
        "mood": mood
    })

# Function to run an AutoRegressive model on mood series
# Takes a mood series as input and fits an AutoRegressive model
# Returns the predicted next mood value
def run_ar_model(mood_series):
    if len(mood_series) < 2:
        return None
    model = AutoReg(mood_series, lags=1, old_names=False)
    result = model.fit()
    prediction = result.predict(start=len(mood_series), end=len(mood_series))
    return prediction.iloc[0]


# Function to run an ARIMA model on mood series
# Takes a mood series as input and fits an ARIMA model
# Returns the predicted next mood value
def run_arima_model(mood_series):
    if len(mood_series) < 2:
        return None
    model = ARIMA(mood_series, order=(1, 0, 0))
    result = model.fit()
    forecast = result.forecast()
    return forecast.values[0]

# Function to run a Vector AutoRegression (VAR) model on a DataFrame
# Takes a DataFrame with multiple time series and fits a VAR model
# Returns the predicted next mood value based on the last row of the DataFrame
def run_var_model(df):
    if df.shape[0] < 2:
        return None
    model = VAR(df)
    result = model.fit(maxlags=1)
    forecast = result.forecast(df.values[-1:], steps=1)
    return forecast[0][df.columns.get_loc("mood")]

# Function to run a Random Forest model on a DataFrame
# Takes a DataFrame with features of emotion, event, sleep and mood labels, fits a Random Forest model
# Returns the predicted next mood value based on the last row of the DataFrame
def run_rf_model(df):
    if df.shape[0] < 2:
        return None
    df["mood_lag1"] = df["mood"].shift(1)  # Yesterday’s mood
    df["mood_lag2"] = df["mood"].shift(2)  # Day before
    df["emotion_lag1"] = df["emotion"].shift(1)
    df["event_lag1"] = df["event"].shift(1)
    df["sleep_lag1"] = df["sleep"].shift(1)
    df["sleep_lag2"] = df["sleep"].shift(2)
    X = df[["event_lag1", "emotion_lag1", "sleep_lag1", "sleep_lag2", "mood_lag1", "mood_lag2"]]
    y = df["mood"]

    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X[:-1], y[:-1])
    last_row = X.iloc[[-1]]
    prediction = model.predict(last_row)
    return int(np.clip(round(prediction[0]), 0, 4)) # Round it to the nearest integer to be able to run classification report


# Function to plot predictions from different models
# Takes actual mood values and a dictionary of model predictions
# Plots the actual mood values and predictions from each model
def plot_predictions(actual_mood, preds):
    plt.figure(figsize=(10, 6))
    plt.plot(range(len(actual_mood)), actual_mood, label="Actual Mood", marker='o')
    plt.axhline(y=actual_mood[-1], color='gray', linestyle='--', label="Latest Mood")

    for i, (label, pred) in enumerate(preds.items()):
        plt.scatter(len(actual_mood), pred, label=f"{label}: {pred:.2f}", s=100)

    plt.xlabel("Time")
    plt.ylabel("Mood (0–5)")
    plt.title("Mood Forecast by Different Models")
    plt.legend()
    plt.grid(True)
    plt.tight_layout()
    plt.show()

# Function to convert mood scores to sentiment classes
# Maps mood scores to sentiment classes: 0-1 as Negative, 2 as Neutral, 3-4 as Positive
def to_sentiment(mood):
    if mood in [0, 1]:
        return 0  # Negative
    elif mood == 2:
        return 1  # Neutral
    else:
        return 2  # Positive

# Function to plot predictions from Random Forest model
# Takes a DataFrame and number of days to plot
# Plots actual mood values and predictions from the Random Forest model
def plot_predictions_rf(df, days_to_plot=30):
    # Get predictions
    predictions = []
    actuals = []
    
    for i in range(2, len(df)):
        # Prepare single-day prediction
        day_data = df.iloc[:i].copy()
        pred = run_rf_model(day_data)
        if pred is not None:
            predictions.append(pred)
            actuals.append(df.iloc[i]['mood'])
    
    # Create plot
    plt.figure(figsize=(12, 6))
    
    # Plot last N days
    start = max(0, len(predictions)-days_to_plot)
    x_axis = range(start, len(predictions))
    
    plt.plot(x_axis, actuals[start:], 'b-', label='Actual Mood', marker='o')
    plt.plot(x_axis, predictions[start:], 'r--', label='Predicted', marker='x')
    
    # Customize plot
    plt.title(f"Mood Prediction (Last {days_to_plot} Days)")
    plt.xlabel("Days")
    plt.ylabel("Mood Score (0-4)")
    plt.ylim(-0.5, 4.5)
    plt.legend()
    plt.grid(True)
    plt.show()

    print(classification_report(actuals, predictions, labels=[0,1,2,3,4],target_names=["Worst", "Bad", "Neutral", "Good", "Best"], zero_division=0))
    mapped_preds = [to_sentiment(pred) for pred in predictions]
    mapped_actuals = [to_sentiment(act) for act in actuals]
    print(classification_report(mapped_actuals, mapped_preds, labels=[0,1,2], target_names=["Negative", "Neutral", "Positive"], zero_division=0))
    plt.figure(figsize=(12, 6))
    
    # Plot last N days for clarity
    start = max(0, len(predictions)-days_to_plot)
    x_axis = range(start, len(predictions))
    
    plt.plot(x_axis, mapped_actuals[start:], 'b-', label='Actual Mood', marker='o')
    plt.plot(x_axis, mapped_preds[start:], 'r--', label='Predicted', marker='x')
    
    # Customize plot
    plt.title(f"Mood Prediction Random Forest")
    plt.xlabel("Days")
    plt.ylabel("Mood Score (0-2)")
    plt.ylim(-0.5, 2.5)
    plt.legend()
    plt.grid(True)
    plt.show()



# Function to run all statistical models on the mood data
# Takes lists of events, emotions, sleep scores, and mood scores
# Prepares a DataFrame and runs AR, ARIMA, VAR, and Random Forest models
# Returns a dictionary with predictions from each model
# Plots the predictions from each model
def run_all_statistical_models(events, emotions, sleep, mood):
    df = prepare_dataframe(events, emotions, sleep, mood)
    ar_pred = run_ar_model(df["mood"])
    arima_pred = run_arima_model(df["mood"])
    var_pred = run_var_model(df)
    rf_pred = run_rf_model(df)

    results = {
        "AR": ar_pred,
        "ARIMA": arima_pred,
        "VAR": var_pred,
        "RandomForest": rf_pred
    }

    plot_predictions(df["mood"].tolist(), results)
    plot_predictions_rf(df, len(df))


    return results
