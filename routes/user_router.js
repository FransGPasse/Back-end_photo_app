const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");
const userValidationRules = require("../validation/user_validation");

/* Skapar en ny användare i databasen */
router.post("/", userValidationRules.createUserRules, userController.register);

module.exports = router;
