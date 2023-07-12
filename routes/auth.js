const express = require('express');
const router = express.Router();

// Controller
const authController = require('../controllers/authController');

// Middleware
const {adminRegisterationValidation,adminLoginValidation} = require('../joiValidation/auth')


// User Login
router.post('/login',adminLoginValidation, authController.adminLogin_post);
router.post('/register', adminRegisterationValidation, authController.adminRegister_post);

module.exports = router;
