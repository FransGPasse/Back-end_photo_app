const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

router.use("/register", require("./user_router"));

router.use("/photos", auth.basic, require("./photo_router"));

router.use("/albums", auth.basic, require("./album_router"));

module.exports = router;
