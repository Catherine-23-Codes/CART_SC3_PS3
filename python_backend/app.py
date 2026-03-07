import os
from flask import Flask, request, jsonify, render_template

# Import our custom image preprocessing and prediction logic
from preprocess import predict_waste

app = Flask(__name__)

# Route to serve the frontend interface
@app.route('/', methods=['GET'])
def index():
    """Renders the main index.html file."""
    # Flask automatically looks in the 'templates' folder for index.html
    return render_template('index.html')

# API Route for waste classification
@app.route('/api/classify', methods=['POST'])
def classify():
    """
    Receives an image via POST request, runs the computer vision model,
    and returns the predicted waste category and confidence score.
    """
    # Check if the request contains the file part
    if 'image' not in request.files:
        return jsonify({"error": "No image uploaded"}), 400
        
    file = request.files['image']
    
    # If the user doesn't select an image, the browser may submit an empty file
    if file.filename == '':
        return jsonify({"error": "No image selected"}), 400
        
    if file:
        try:
            # Read the raw byte data from the uploaded file
            image_bytes = file.read()
            
            # Pass the bytes to our prediction engine
            result = predict_waste(image_bytes)
            
            # Return JSON response containing category and confidence
            return jsonify({
                "success": True,
                "category": result["category"],
                "confidence": result["confidence"],
                "tip": get_recycling_tip(result["category"])
            })
            
        except Exception as e:
            return jsonify({"error": f"Internal server error: {str(e)}"}), 500

def get_recycling_tip(category):
    """Helper function to return contextual recycling tips based on classification."""
    tips = {
        'Plastic': 'Clean plastic bottles before recycling.',
        'Paper': 'Keep paper clean and dry. Flatten cardboard boxes.',
        'Glass': 'Rinse out any food residue before tossing.',
        'Metal': 'Crush aluminum cans to save space.',
        'Organic': 'Composting at home provides great soil fertilizer!',
        'E-Waste': 'Take to a specialized e-waste drop-off center.',
        'Non-Recyclable': 'Please ensure this goes directly to general landfill.'
    }
    return tips.get(category, 'Always check local guidelines.')

if __name__ == '__main__':
    # Start the Flask development server on port 5000 as requested
    print("Starting AI Server...")
    app.run(host='0.0.0.0', port=5000, debug=True)
