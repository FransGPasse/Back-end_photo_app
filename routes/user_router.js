const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");
const userValidationRules = require("../validation/user_validation");

/* Get all resources */
router.get("/", userController.readAll);

router.post("/", userValidationRules.createRules, userController.register);

module.exports = router;
