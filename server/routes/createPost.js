const express = require("express");
const createPostImage = require("../controllers/createPostImage");
const createPostText = require("../controllers/createPostText");

const multer = require("multer");


const storage = multer.memoryStorage();

const upload = multer({storage});

const router = express.Router();

router.post("/createpostimage/", upload.single("imagePost"),createPostImage)

router.post("/createposttext/", createPostText)

module.exports = router;