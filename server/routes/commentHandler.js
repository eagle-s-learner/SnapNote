const express = require("express");
const cookieParser = require("cookie-parser");
const verifyUser = require("../middlewares/verifyUser");
const {getComments, postComments} = require("../controllers/commentsHandler");

const router = express.Router();
router.use(cookieParser());

router.post("/getcomments/", verifyUser, getComments);

router.post("/postcomments/", verifyUser, postComments);

module.exports = router;