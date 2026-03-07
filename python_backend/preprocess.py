import tensorflow as tf
from tensorflow.keras.preprocessing.image import img_to_array
from PIL import Image
import numpy as np
import io

# Load the pretrained model (ensure this file exists when running the application)
# For the prototype, we are using MobileNetV2 architecture.
try:
    model = tf.keras.models.load_model('waste_model.h5')
    print("Model loaded successfully.")
except Exception as e:
    print(f"Warning: Model not found. Please train model.py first. Error: {e}")
    model = None

# Defining our target classes based on the dataset structure
CLASS_NAMES = ['Plastic', 'Paper', 'Glass', 'Metal', 'Organic', 'E-Waste', 'Non-Recyclable']

def prepare_image(image_bytes):
    """
    Preprocess the incoming image bytes for the MobileNetV2 model.
    1. Opens the image using Pillow.
    2. Converts it to RGB (removing alpha channels if any).
    3. Resizes it to 224x224 (the standard input size for MobileNetV2).
    4. Converts the image into a numpy array and expands dimensions for a batch size of 1.
    5. Normalizes the pixel values.
    """
    # Open the image using Pillow
    img = Image.open(io.BytesIO(image_bytes))
    
    # Ensure image is in RGB format
    if img.mode != 'RGB':
        img = img.convert('RGB')
        
    # Resize to match model's expected input shape (224x224)
    img = img.resize((224, 224))
    
    # Convert image to numpy array
    img_array = img_to_array(img)
    
    # Expand dimensions to create a batch of 1: shape becomes (1, 224, 224, 3)
    img_array = np.expand_dims(img_array, axis=0)
    
    # Normalize the image array (MobileNetV2 expects values between -1 and 1)
    img_array = tf.keras.applications.mobilenet_v2.preprocess_input(img_array)
    
    return img_array

def predict_waste(image_bytes):
    """
    Runs the preprocessed image through the trained AI model.
    Returns the predicted category and confidence level.
    """
    if model is None:
        # Fallback if model hasn't been trained yet
        return {"category": "Model not trained", "confidence": 0.0}
        
    try:
        # Step 1: Preprocess the input
        processed_img = prepare_image(image_bytes)
        
        # Step 2: Make the prediction
        predictions = model.predict(processed_img)
        
        # Step 3: Extract the highest probability class
        score = tf.nn.softmax(predictions[0])
        predicted_class_index = np.argmax(score)
        confidence = 100 * np.max(score)
        
        predicted_category = CLASS_NAMES[predicted_class_index]
        
        return {
            "category": predicted_category,
            "confidence": round(float(confidence), 2)
        }
    except Exception as e:
        print(f"Prediction Error: {e}")
        return {"category": "Error processing image", "confidence": 0.0}
