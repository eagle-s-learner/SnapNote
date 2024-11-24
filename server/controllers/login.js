// function fetctdata(){
//     return new Promise((resolve, reject) => {
//         setTimeout(() => resolve(3), 3000)
//     })
// }
// const data = await fetctdata();
const jsonwebtoken = require("jsonwebtoken");
async function login(req, res){
    const {email, password} = req.body;
    console.log(email, password)
    
    res.end();
    // res.cookie("hey", "hello").send({msg: data});
}


module.exports = {
    loginHandler: login,
    // signupHandler: signup
}
// async function signup(req, res){
//     const body = req.body;
//     console.log(body);
//     const file = req.file;
//     console.log(file);
//     res.end("file uploaded successfully!");
// }