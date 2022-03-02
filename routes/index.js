const express = require("express");
const router = express.Router();

/* GET / */
router.get("/", (req, res, next) => {
	res.send({ success: true, data: { msg: "oh, hi" } });
});

router.use("/user", auth.basic, require("./user_router"));

router.use("/photo", require("./photo_router"));

module.exports = router;
