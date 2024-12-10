const express = require("express");
const cookieParser = require("cookie-parser");
const {userFollowers, userFollowing} = require("../controllers/getFolloweresOrFollowingOfUser");

const router = express.Router();
router.use(cookieParser());

router.get("/followers/", userFollowers)

router.get("/following/", userFollowing)

module.exports = router;