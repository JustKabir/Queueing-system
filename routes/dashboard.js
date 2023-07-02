const express = require('express');
const router = express.Router();

// Controller
const dashboardController = require('../controllers/dashboardController');

// Middleware
const loginRequired = require('../middlewares/loginRequired');
const {organizationDetailsPatch} = require('../joiValidation/organization');


// User Login
router.patch('/edit',loginRequired,organizationDetailsPatch, dashboardController.editDetails_patch);
router.get('/', loginRequired, dashboardController.dashboard_get);

module.exports = router;
