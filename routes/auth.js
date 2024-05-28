const { register, login } = require('../controllers/authController');

const router = require('express').Router();

router.post('/login', login);
router.post('/register', register);

module.exports = router;