const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

/* Huvudsaklig GET request för att se så vi är anslutna / */
router.get("/", (req, res, next) => {
	res.send({ success: true, data: { msg: "Well hello there 😊" } });
});

router.use("/register", require("./user_router"));

router.use("/photos", auth.basic, require("./photo_router"));

router.use("/albums", auth.basic, require("./album_router"));

module.exports = router;
