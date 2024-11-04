const express = require("express");
const confirmAcoountCreation = require("../controllers/confirmAccountCreation");
const multer = require("multer");


const storage = multer.memoryStorage();

const upload = multer({storage});

const router = express.Router();

router.post("/confirmaccountcreation/",upload.single("profilePic"), confirmAcoountCreation);

module.exports = router;