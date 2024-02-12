const {User} = require("../db/index");

function userMiddleware(req,res,next){
     const username = req.headers.username;
     const password = req.headers.password;

     User.findOne({
        username: username,
        password: password
     })
     .then((user) => {
        if (user){
            next();
        } else {
            res.status(401)
            .json({
                msg: "User dosent exist"
            })
        }

     })
}
 module.exports = userMiddleware;


