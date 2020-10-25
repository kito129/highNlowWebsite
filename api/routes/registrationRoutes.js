const express = require("express");
const router = express.Router();


const RegistrationController = require('../controllers/registrationController');

// Handle incoming requests to /idea

// ok
router.post("/create", RegistrationController.registratons_create_registraton);//

// ok
router.post("/checkReg", RegistrationController.registratons_check_registraton);//

// ok
router.get("/all", RegistrationController.registratons_get_registraton);//


module.exports = router;
