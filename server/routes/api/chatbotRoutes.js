const express = require('express');
const axios = require('axios');  // For making HTTP requests from Node.js
const router = express.Router();

// Route for handling chatbot interactions
router.post('/chatbot', async (req, res) => {
  const userMessage = req.body.message;

  try {
    // Call the Python chatbot API
    const response = await axios.post('http://localhost:5000/chatbot', {
      message: userMessage
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error communicating with the chatbot' });
  }
});

module.exports = router;
