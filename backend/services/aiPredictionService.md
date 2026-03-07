Create a service that communicates with the Python Flask AI model.

Requirements:
- Use Axios to send HTTP request
- Send uploaded image file to Flask API
- Endpoint defined in config/aiService.js
- Receive prediction result
- Return prediction data to controller

Expected Flask response:
{
  "class": "plastic",
  "confidence": 0.94
}

Handle network errors gracefully.