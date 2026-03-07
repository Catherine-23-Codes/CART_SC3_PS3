import axios from 'axios';
import FormData from 'form-data';

/**
 * Service to handle communication with the Python/Flask AI API.
 */
export const getPredictionFromAI = async (imageBuffer, filename) => {
  try {
    const aiUrl = process.env.AI_MODEL_URL || 'http://localhost:5001/predict';
    
    const formData = new FormData();
    formData.append('image', imageBuffer, {
      filename: filename || 'upload.jpg',
      contentType: 'image/jpeg'
    });

    // Mocking the response if the AI API is not running, to ensure the app doesn't crash
    // during local development. In reality, we would just await axios.post
    
    // const response = await axios.post(aiUrl, formData, {
    //  headers: { ...formData.getHeaders() }
    // });
    // return response.data;

    // MOCK RESPONSE for now
    await new Promise(resolve => setTimeout(resolve, 1000));
    const mockClasses = ['Plastic', 'Paper', 'Glass', 'Organic', 'Metal'];
    const randomClass = mockClasses[Math.floor(Math.random() * mockClasses.length)];
    
    return {
      class: randomClass,
      confidence: 0.85 + (Math.random() * 0.14) // Random confidence between 0.85 and 0.99
    };
  } catch (error) {
    throw new Error('AI model is unavailable');
  }
};
