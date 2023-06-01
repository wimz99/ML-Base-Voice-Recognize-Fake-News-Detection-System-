# Import required libraries
from flask import Flask, render_template, request
import joblib
import pandas as pd
import re
import string
from sklearn.feature_extraction.text import TfidfVectorizer

# Initialize the Flask application
app = Flask(__name__)

# Load the models
LR = joblib.load('LR_model.pkl')
DT = joblib.load('DT_model.pkl')
GBC = joblib.load('GBC_model.pkl')
RFC = joblib.load('RFC_model.pkl')
vectorization = joblib.load('vectorization.pkl')

def wordopt(text):
    text = text.lower()
    text = re.sub('\[.*?\]', '', text)
    text = re.sub("\\W"," ",text) 
    text = re.sub('https?://\S+|www\.\S+', '', text)
    text = re.sub('<.*?>+', '', text)
    text = re.sub('[%s]' % re.escape(string.punctuation), '', text)
    text = re.sub('\n', '', text)
    text = re.sub('\w*\d\w*', '', text)    
    return text

def output_lable(n):
    if n == 0:
        return "Fake News"
    elif n == 1:
        return "Not A Fake News"

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        message = request.form['message']
        data = [message]
        vect = vectorization.transform(data).toarray()
        pred_LR = LR.predict(vect)
        pred_DT = DT.predict(vect)
        pred_GBC = GBC.predict(vect)
        pred_RFC = RFC.predict(vect)

        return render_template('result.html', prediction_LR = output_lable(pred_LR[0]), 
                                prediction_DT = output_lable(pred_DT[0]),
                                prediction_GBC = output_lable(pred_GBC[0]),
                                prediction_RFC = output_lable(pred_RFC[0]))

if __name__ == '__main__':
    app.run(debug=True)
