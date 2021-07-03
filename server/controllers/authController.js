var User = require("../models/userModel.js");
const bcrypt = require('bcrypt')
const passport = require("passport");

const register=(req,res)=>{
  console.log('register called server')
    const newUser = {
      type: req.body.type,
      email: req.body.email,
      password: req.body.password,

    };
    User.findOne({
      email: req.body.email,
    }).then((user) => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          newUser.password = hash;
          User.create(newUser)
            .then((result) => {
              console.log("created")
              res.send(result);

            })
            .catch((err) => err.status(400).json("Error" + err));
        });
      } else {
        console.log("not created")
        res.send("not found");
      }
    });
}

const login = (req,res,next)=>{
    passport.authenticate("local", (err, user, info) => {
      if (err) throw err;
      if (!user) {
        res.send("not found");
      } else {
        req.logIn(user, (err) => {
          if (err) throw err;
          res.send(user);
          console.log(req.user);
        });
      }
    })(req, res, next);
  };

module.exports = {register,login}