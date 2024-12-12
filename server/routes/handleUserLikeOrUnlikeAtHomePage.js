const express = require("express");
const handleUserLikeOrUnlikeAtHomePage = require("../controllers/handleUserLikeOrUnlikeAtHomePage");
const cookieParser = require("cookie-parser");
const verifyUser = require("../middlewares/verifyUser");

const router = express.Router();
router.use(cookieParser());

router.post("/userlikeathomepage/", verifyUser, handleUserLikeOrUnlikeAtHomePage.userLikeAtHomePage)

router.post("/userunlikeathomepage/", verifyUser, handleUserLikeOrUnlikeAtHomePage.userUnlikeAtHomePage)

module.exports = router;