const express = require("express");
const { sequelize } = require("../models");
const { DataTypes } = require("sequelize");
const User = require("../models/user")(sequelize, DataTypes);
const jsonWebToken = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const router = express.Router();
router.use(cookieParser())

const jwtSecret = process.env.JWT_SECRET;

router.get("/userProfileIfCookieSet/",async (req, res) => {
    const { token } = req.cookies;
    try {
        // console.log("user profile")

        if (token) {
            jsonWebToken.verify(token, jwtSecret, {}, async (err, user) => {
                if (err) {
                    throw err;
                }
                const userData = await User.findOne({
                    where: {
                        email: user.email,
                    }
                })

                res.status(200).json(userData.dataValues)
            });
        }else{
            res.status(404).json({message: "Plase, login.."})
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({message: err.message})
    }
});

module.exports = router;
