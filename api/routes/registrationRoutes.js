const express = require("express");
const router = express.Router();


const RegistrationController = require('../controllers/registrationController');

// Handle incoming requests to /idea

// ok
router.get("/", RegistrationController.registratons_create_registraton);//


module.exports = router;
