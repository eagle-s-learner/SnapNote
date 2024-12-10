const express = require("express");
const cookieParser = require("cookie-parser");
const verifyUser = require("../middlewares/verifyUser");
const sendRequest = require("../controllers/sendRequest");

const router = express.Router();

router.use(cookieParser());

router.post("/sendrequest/", verifyUser, sendRequest);

module.exports = router;