const express = require("express");
const router = express.Router();
const albumValidation = require("../validation/album_validation");
const albumController = require("../controllers/album_controller");

/* Get all resources */
router.get("/", albumController.readAll);

router.post("/", albumValidation.createRules, albumController.register);

module.exports = router;
