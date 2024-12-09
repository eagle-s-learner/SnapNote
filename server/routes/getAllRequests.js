const express = require("express");
const getAllRequests = require("../controllers/getAllRequests")
const cookieParser = require("cookie-parser");

const router = express.Router();
router.use(cookieParser());

router.get("/getallrequests/", getAllRequests);

module.exports = router;