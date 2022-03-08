const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

/* GET / */
router.get("/", (req, res, next) => {
	res.send({ success: true, data: { msg: "oh, hi" } });
});

router.use("/user", require("./user_router"));

router.use("/photo", auth.basic, require("./photo_router"));

module.exports = router;
