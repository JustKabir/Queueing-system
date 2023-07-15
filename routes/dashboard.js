const express = require('express');
const router = express.Router();

// Controller
const dashboardController = require('../controllers/dashboardController');

// Middleware
const loginRequired = require('../middlewares/loginRequired');
const {counterDetailsPatch, createCounter} = require('../joiValidation/counter');


// User Login
router.get('/', loginRequired, dashboardController.dashboard_get);
router.patch('/:counterId/edit',loginRequired,counterDetailsPatch, dashboardController.editDetails_patch);
router.patch('/:counterId/nexttoken',loginRequired, dashboardController.nextToken_patch);
router.post('/counter/create', loginRequired,createCounter,dashboardController.createCounter_post);
router.get('/counter/:counterId', loginRequired,dashboardController.counter_get);

module.exports = router;
