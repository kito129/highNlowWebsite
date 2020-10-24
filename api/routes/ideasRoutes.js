const express = require("express");
const router = express.Router();


const IdeasController = require('../controllers/ideasController');

// Handle incoming requests to /idea

// ok
router.get("/", IdeasController.idea_get_all);//

// ok
router.get("/home", IdeasController.idea_get_home);//

// ok
router.get("/:ideaId", IdeasController.ideas_get_idea);//


/*

router.get("/tagCount", IdeasController.ideas_get_getTagCount);//

router.get("/:tag", IdeasController.ideas_get_getByTag);//

router.get("/:ticker", IdeasController.ideas_get_getByTicker);//

*/

module.exports = router;
