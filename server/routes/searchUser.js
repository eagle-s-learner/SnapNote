const express = require("express");
const cookieParser = require("cookie-parser");
const verifyUser = require("../middlewares/verifyUser");
const searchUser = require("../controllers/searchUser");

const router = express.Router();
router.use(cookieParser());

router.post("/searchuser/", verifyUser, searchUser)

module.exports = router;