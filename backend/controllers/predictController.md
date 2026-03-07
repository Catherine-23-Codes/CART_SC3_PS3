Create a controller function called predictWaste.

Responsibilities:
- Receive uploaded image from request
- Call AI prediction service
- Get prediction result from Flask AI API
- Update dashboard statistics
- Return JSON response to frontend

Response format example:
{
  "class": "Plastic",
  "confidence": 0.94
}

Handle errors if:
- Image upload fails
- AI model is unavailable