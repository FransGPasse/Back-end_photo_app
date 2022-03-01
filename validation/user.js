/**
 * Example Validation Rules
 */

 const { body } = require("express-validator");
 const models = require("../models");
 

//!Checks if the email inputted is an email address and is maximum 250 characters long
 /**
  * Create Example validation rules
  *
  * Required: title
  * Optional: -
  */
 const createRules = [body("email").isEmail().isLength({ max: 250 })];
 
 /**
  * Update Example validation rules
  *
  * Required: -
  * Optional: title
  */
 const updateRules = [body("title").optional().isLength({ min: 4 })];
 
 module.exports = {
     createRules,
     updateRules,
 };
 