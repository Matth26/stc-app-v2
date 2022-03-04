// Routes for /api/users/
const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { registerUser, loginUser } = require('../controllers/userController');

router.post('/', registerUser);
router.post('/login', loginUser);
//router.post('/login', protect, loginUser);

module.exports = router;
