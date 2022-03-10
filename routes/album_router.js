const express = require("express");
const router = express.Router();
const albumValidation = require("../validation/album_validation");
const albumController = require("../controllers/album_controller");

/* Hämtar alla album som tillhör användaren */
router.get("/", albumController.readAll);

/* Hämtar ett album som tillhör användaren */
router.get("/:id", albumController.readSpecific);

/* Skapar ett album */
router.post("/", albumValidation.createAlbumRule, albumController.createAlbum);

/* Lägger över ett foto i ett album */
router.post(
	"/:id/photo/",
	albumValidation.addPhotoToAlbumRules,
	albumController.postToAlbum
);

/* Uppdaterar ett album */
router.put("/:id", albumValidation.createAlbumRule, albumController.updateAlbum);

module.exports = router;
