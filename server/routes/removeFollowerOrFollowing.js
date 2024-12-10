const express = require("express");
const cookieParser = require("cookie-parser");
const verifyUser = require("../middlewares/verifyUser");
const {removeFollower, removeFollowing} = require("../controllers/removerFollowerOrFollowing")

const router = express.Router();
router.use(cookieParser());

router.post("/removefollower/", verifyUser, removeFollower)


router.post("/removefollowing/", verifyUser, removeFollowing)

module.exports = router