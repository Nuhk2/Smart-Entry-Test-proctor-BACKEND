const express = require('express');
const { downloadUserPDF } = require('../../controllers/auth/userController');
const router = express.Router();

router.get('/user-pdf/:userId', downloadUserPDF);

module.exports = router;
