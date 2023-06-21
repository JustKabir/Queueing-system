const express = require('express');
const router = express.Router();

// Controller
const authController = require('../controllers/authController');

// Middleware
const {userRegisterValidation,userLoginValidation} = require('../joiValidation/auth')


// User Login
router.post('/login',userLoginValidation, authController.organizationLogin_post);
router.post('/register', userRegisterValidation, authController.organizationRegister_post);

module.exports = router;
