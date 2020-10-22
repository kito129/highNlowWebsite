const express = require("express");
const router = express.Router();


const FormazioneController = require('../controllers/formazioneController');

// Handle incoming requests to /idea

// TODO
router.get("/", FormazioneController.formazione_get_all);//

// TODO
router.get("/:formazioneId", FormazioneController.formaziones_get_formazione);//


/*

router.get("/tagCount", IdeasController.ideas_get_getTagCount);//

router.get("/:tag", IdeasController.ideas_get_getByTag);//

router.get("/:ticker", IdeasController.ideas_get_getByTicker);//

*/

module.exports = router;
