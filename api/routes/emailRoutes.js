const express = require("express");
const router = express.Router();


const EmailController = require('../controllers/emailController');

// Handle incoming requests to /idea

// ok
router.post("/send", EmailController.email_send_email);//



module.exports = router;
