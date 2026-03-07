This directory is the designated location for your pretrained Computer Vision AI model.

# How to implement your Pretrained AI Model:
1. Drag and drop your pretrained `waste_classifier.h5` file into this specific `backend/model/` folder.
2. The exact file path must be: `CART AI SYSTEM/backend/model/waste_classifier.h5`
3. After placing the file here, stop your runing Python Server (if you have it running) by hitting `CTRL+C` in that terminal.
4. Restart the python service by typing: `python app.py` inside the `/ai_service` folder!

The Python Flask API (`ai_service/app.py`) will automatically detect the `.h5` file and replace the "mock fallback" predictions with your REAL Artificial Intelligence predictions!
