const express = require("express");
const router = express.Router();
const photoController = require("../controllers/photo_controller");
const photoValidation = require("../validation/photo_validation");

/* Hämta alla foton som tillhör den autentiserade användaren */
router.get("/", photoController.showAll);

/* Hämter ett specifikt foto från den autentiserade användaren */
router.get("/:id", photoController.showSpecific);

/* Lägg till ett foto för den autentiserade användaren */
router.post("/", photoValidation.createRules, photoController.postPhoto);

/* Ändrar titeln, kommentaren eller URL:n på ett specifikt foto */
router.put("/:id", photoValidation.updateRules, photoController.updatePhoto);

module.exports = router;
