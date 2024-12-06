const express = require("express");
const handleUserLikeUnlike = require("../controllers/handleUserLikeUnlike");
const cookieParser = require("cookie-parser");

const router = express.Router();
router.use(cookieParser());

router.post("/userlike/", handleUserLikeUnlike.userLike)

router.post("/userunlike/", handleUserLikeUnlike.userUnlike)

module.exports = router;