const express = require("express");
const getAllPost = require("../controllers/getAllPost");

const router = express.Router();

router.get("/getallpost/", getAllPost);

module.exports = router;