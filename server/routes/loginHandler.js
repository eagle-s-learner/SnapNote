const express = require("express");
// const multer = require("multer");
const { loginHandler } = require("../controllers/login.js");


const router = express.Router();

router.post("/login/", loginHandler);


module.exports = router;

// const storage = multer.diskStorage({
    //     destination: function (req, file, cb) {
        //         return cb(null, "uploads");
        //     },
        //     filename: function (req, file, cb) {
//         return cb(null, `${Date.now()}-${file.originalname}`);
//     },
// });
// const upload = multer({ storage: storage });
// router.post('/signup/',upload.single("profilePic"), signupHandler);