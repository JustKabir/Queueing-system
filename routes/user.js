const express = require('express');
const router = express.Router();

// Controller
const userController = require('../controllers/userController');

// Middleware
// const {userRegisterValidation,userLoginValidation} = require('../joiValidation/auth')


// User Login
router.get('/home/:orgId', userController.defaultPage_get);
router.post('/home/:orgId/generatetoken', userController.generateToken_post);
router.delete('/home/:orgId/exitqueue', userController.exitQueue_delete);
module.exports = router;
