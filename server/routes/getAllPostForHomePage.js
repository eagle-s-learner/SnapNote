const express = require("express");
const getAllPostForHomePage = require("../controllers/getAllPostForHomePage");
const verifyUser = require("../middlewares/verifyUser");
const cookieParser = require("cookie-parser");

const router = express.Router();
router.use(cookieParser());

router.get("/getallpostforhomepage/",verifyUser, getAllPostForHomePage);

module.exports = router;