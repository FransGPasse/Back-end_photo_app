const express = require("express");
const router = express.Router();
const photoController = require("../controllers/photo_controller");
const photoValidation = require("../validation/photo_validation");

/* Get all resources */
router.get("/", photoController.readAll);

router.post("/", photoValidation.createRules, photoController.register);


module.exports = router;
