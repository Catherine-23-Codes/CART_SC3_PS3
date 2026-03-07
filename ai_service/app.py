import os
import io
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
try:
    import tensorflow as tf
    from tensorflow.keras.models import load_model
    from tensorflow.keras.preprocessing.image import img_to_array
except ImportError:
    tf = None

app = Flask(__name__)
CORS(app)

MODEL_PATH = r'c:\Users\aishwarya amin\OneDrive\Desktop\CART AI SYSTEM\backend\model\waste_classifier.h5'
model = None

# 7 Categories listed in specification
CATEGORIES = [
    'Plastic',
    'Paper',
    'Glass',
    'Metal',
    'Organic Waste',
    'E-Waste',
    'Non-Recyclable Waste'
]

# Load model if it exists
if tf and os.path.exists(MODEL_PATH):
    try:
        model = load_model(MODEL_PATH)
        print(f"Loaded trained model from {MODEL_PATH}")
    except Exception as e:
        print(f"Error loading model: {e}")
else:
    print(f"Warning: Model {MODEL_PATH} not found or tensorflow not installed. Will use fallback random mock prediction.")

def prepare_image(image, target_size=(224, 224)):
    if image.mode != "RGB":
        image = image.convert("RGB")
    image = image.resize(target_size)
    if tf:
        image = img_to_array(image)
        image = np.expand_dims(image, axis=0)
        image = image / 255.0 # normalize
    return image

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image part provided'}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        # Read the image
        img_bytes = file.read()
        image = Image.open(io.BytesIO(img_bytes))
        
        # Preprocess
        processed_image = prepare_image(image, target_size=(224, 224))
        
        # Predict
        if model:
            predictions = model.predict(processed_image)
            predicted_class_idx = np.argmax(predictions[0])
            confidence = float(predictions[0][predicted_class_idx])
            category = CATEGORIES[predicted_class_idx]
        else:
            # Fallback mock logic if model isn't built yet
            import random
            category = random.choice(CATEGORIES)
            
            # Map Organic Waste -> Organic, Non-Recyclable Waste -> Non-Recyclable for our backend
            if category == 'Organic Waste': category = 'Organic'
            if category == 'Non-Recyclable Waste': category = 'Non-Recyclable'
            
            confidence = round(random.uniform(0.85, 0.99), 4)

        return jsonify({
            'category': category,
            'confidence': confidence
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
