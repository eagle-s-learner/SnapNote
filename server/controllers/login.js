// function fetctdata(){
//     return new Promise((resolve, reject) => {
//         setTimeout(() => resolve(3), 3000)
//     })
// }
// const data = await fetctdata();
const jsonwebtoken = require("jsonwebtoken");
const { sequelize } = require("../models");
const { DataTypes } = require("sequelize");
const User = require("../models/user")(sequelize, DataTypes);
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

async function login(req, res) {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        const user = await User.findOne({
            where: {
                email,
            },
        });

        if (user) {
            const checkPassword = bcrypt.compareSync(
                password,
                user.dataValues.password
            );

            if (checkPassword) {
                jsonwebtoken.sign(
                    {
                        email: user.dataValues.email,
                        password: user.dataValues.password,
                    },
                    jwtSecret,
                    {},
                    (error, token) => {
                        if (error) {
                            throw error;
                        }

                        res.cookie("token", token).json(user.dataValues);
                    }
                );
            }else{
                res.status(422).json({message: "Password or Email is incorrect"})
            }
        }else{
            res.status(400).json({message: "User Not Found"});
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
    
}

module.exports = {
    loginHandler: login,
    // signupHandler: signup
};
// async function signup(req, res){
//     const body = req.body;
//     console.log(body);
//     const file = req.file;
//     console.log(file);
//     res.end("file uploaded successfully!");
// }
