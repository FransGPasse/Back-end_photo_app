const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");
const exampleValidationRules = require("../validation/example");


/* Get all resources */
router.get("/", userController.read);


module.exports = router;
