import fs from 'fs';
import FormData from 'form-data';
import axios from 'axios';

async function testUpload() {
  const dummyFile = 'dummy.jpg';
  fs.writeFileSync(dummyFile, 'dummy data');

  try {
    const formData = new FormData();
    formData.append('image', fs.createReadStream(dummyFile), {
        filename: 'dummy.jpg',
        contentType: 'image/jpeg',
    });

    const response = await axios.post('http://localhost:5000/api/predict', formData, {
      headers: formData.getHeaders(),
    });

    console.log('Success:', response.data);

    const statsResponse = await axios.get('http://localhost:5000/api/dashboard/stats');
    console.log('Stats updated:', statsResponse.data);

  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  } finally {
    fs.unlinkSync(dummyFile);
  }
}

testUpload();
