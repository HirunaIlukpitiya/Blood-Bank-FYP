from flask import Flask, request, jsonify
from flask_cors import CORS
from predictData import predict_blood_demand

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    start_date = data['start_date']
    prediction_days = data['prediction_days']
    blood_group = data.get('blood_group')
    blood_product = data.get('blood_product')
    
    if blood_group == "" or blood_group == "None" or blood_group == "null":
        blood_group = None
    if blood_product == "" or blood_product == "None" or blood_product == "null":
        blood_product = None
    
    result = predict_blood_demand(start_date, prediction_days, blood_group, blood_product)
    
    if result['predictions'] is None:
        return jsonify({'message': result['message']}), 400
    
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True, port=4600)