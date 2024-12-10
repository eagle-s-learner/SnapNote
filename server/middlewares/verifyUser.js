const jsonWebToken = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

const verifyUser = async (req, res, next) =>{
    try {
    const { token } = req.cookies;
        if (token) {
            jsonWebToken.verify(token, jwtSecret, {}, async (err, user) => {
                if (err) throw err;

                // console.log(requests);
                req.user = user;
                next();
            });
        } else {
            res.status(401).json({ message: "Unauthorized" });
        }
    } catch (error) {
        // console.log(error);
        res.status(error.status).json({ message: "Reload the page..." });
    }
}

module.exports = verifyUser;