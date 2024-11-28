const express = require("express");
const jsonWebToken = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const router = express.Router();
router.use(cookieParser());

const jwtSecret = process.env.JWT_SECRET;

router.post("/logout/", async (req, res) => {
    const { token } = req.cookies;
    try {
        if (token) {
            jsonWebToken.verify(token, jwtSecret, {}, async (error, user) => {
                if (error) {
                    throw error;
                }

                res.clearCookie("token");
                res.status(200).json({ message: "Logged out!!" });
            });
        }
    } catch (error) {
        // console.log(error)
        res.status(error.status).json({ message: error.message });
    }
});

module.exports = router;
