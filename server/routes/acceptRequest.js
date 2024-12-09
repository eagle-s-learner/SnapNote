const express = require("express");
const cookieParser = require("cookie-parser");
const acceptRequest = require("../controllers/acceptRequest");

const router = express.Router();
router.use(cookieParser())

router.post("/acceptrequest/", acceptRequest);

module.exports = router;