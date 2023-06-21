const express = require('express');
const router = express.Router();

// Controller
const authController = require('../controllers/dashboardController');

// Middleware
const {userRegisterValidation,userLoginValidation} = require('../joiValidation/auth')
const loginRequired = require('../middlewares/loginRequired')


// User Login
router.post('/login',userLoginValidation, authController.organizationLogin_post);
router.post('/register', userRegisterValidation, authController.organizationRegister_post);

module.exports = router;
