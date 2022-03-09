const express = require("express");
const router = express.Router();
const photoController = require("../controllers/photo_controller");
const photoValidation = require("../validation/photo_validation");

/* Hämta alla foton som tillhör den autentiserade användaren */
router.get("/", photoController.showAll);

router.get("/:id", photoController.showSpecific);

/* Lägg till ett foto för den autentiserade användaren */
router.post("/", photoValidation.createRules, photoController.register);

router.put("/", photoValidation.createRules, photoController.register);

module.exports = router;
