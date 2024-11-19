import numpy as np
import joblib
import tensorflow as tf
import pandas as pd
from datetime import datetime, timedelta
from flask import Flask, request, jsonify

app = Flask(__name__)
scaler = joblib.load('scaler.pkl')
model = tf.keras.models.load_model('lstm_model.keras')

df = pd.read_csv('blood_usage_data_sri_lanka_4_years.csv')
df['date'] = pd.to_datetime(df['date'])
blood_groups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
blood_products = ['RBC', 'Plasma', 'Platelets']

def get_sequence_ending_on_date(df, end_date, seq_length):
    end_date = pd.to_datetime(end_date)
    start_date = end_date - timedelta(days=seq_length)
    sequence = df[(df['date'] > start_date) & (df['date'] <= end_date)]
    return sequence
def predict_future(model, data, seq_length, n_days):
    predictions = []
    current_seq = data[-seq_length:]
    for _ in range(n_days):
        pred = model.predict(current_seq.reshape(1, seq_length, 1))
        predictions.append(pred[0, 0])
        current_seq = np.append(current_seq[1:], pred)
    return predictions
def predict_blood_demand(start_date, prediction_days, blood_group, blood_product):
    seq_length = 30 
    if 'blood_group' not in df.columns or 'blood_product' not in df.columns:
        raise KeyError("DataFrame does not contain required columns 'blood_group' and 'blood_product'")
    
    future_predictions = {}

    if not blood_group and not blood_product:
        for bg in blood_groups:
            for bp in blood_products:
                filtered_data = df[(df['blood_group'] == bg) & (df['blood_product'] == bp)]
                sequence = get_sequence_ending_on_date(filtered_data, start_date, seq_length)
                if len(sequence) < seq_length:
                    future_predictions[f'{bg}_{bp}'] = f"Not enough data for {bg} {bp} to make predictions."
                    continue
                sequence_values = sequence['units_used'].values
                sequence_scaled = scaler.transform(sequence_values.reshape(-1, 1))
                future_predictions[f'{bg}_{bp}'] = predict_future(model, sequence_scaled, seq_length, prediction_days)
    else:
        filtered_data = df[(df['blood_group'] == blood_group) & (df['blood_product'] == blood_product)]
        sequence = get_sequence_ending_on_date(filtered_data, start_date, seq_length)
        if len(sequence) < seq_length:
            return {
                'message': f"Not enough data for {blood_group} {blood_product} to make predictions.",
                'predictions': None
            }
        sequence_values = sequence['units_used'].values
        sequence_scaled = scaler.transform(sequence_values.reshape(-1, 1))
        future_predictions[f'{blood_group}_{blood_product}'] = predict_future(model, sequence_scaled, seq_length, prediction_days)

    for key in future_predictions:
        if isinstance(future_predictions[key], list):
            future_predictions[key] = np.ceil(scaler.inverse_transform(np.array(future_predictions[key]).reshape(-1, 1))).tolist()

    return {
        'message': 'Prediction successful.',
        'predictions': future_predictions
    }