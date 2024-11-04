const express = require("express");
const emailVerifyHandler = require("../controllers/emailVerifyHandler.js");
const { sequelize } = require("../models/index.js");
const { DataTypes } = require("sequelize");
const router = express.Router();
const EmailVerification = require("../models/emailverification.js")(
    sequelize,
    DataTypes
);

router.post("/emailverify/", emailVerifyHandler);

router.post("/codeforemailverify/", async (req, res) => {
    const { email, verifyingCode } = req.body;
    try {
        const userDetails = await EmailVerification.findOne({
            where: {
                email,
                // isVerified: false,
            },
        });

        if(userDetails && userDetails.isVerified){
            res.status(200).json({
                message: "Your Email Is Already Verified..",
                alreadyVerified: true,
            });
            return;
        }

        if (userDetails && verifyingCode === userDetails.verificationCode) {
            await EmailVerification.update(
                {
                    isVerified: true,
                    modifiedAt: new Date(Date.now()),
                },
                {
                    where: {
                        email: email,
                    },
                }
            );

            res.status(200).json({ message: "Code verified Successfully.." });
            return;
        }

        res.status(400).json({ message: "Enter the valid Code.." });
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
