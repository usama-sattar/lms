var Users = require("../models/userModel.js");
var multer = require("multer")
var path = require('path');
var Class = require('../models/classModel.js')

//storing image
var Storage= multer.diskStorage({
    destination:"./public/uploads",
    filename: (req,file,cb)=>{
      cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
    }
  })
  var upload=multer({
    storage: Storage,
    fileFilter:function(req,file,cb){
      checkType(file,cb);
    }
  }).single('file')
  
  //checking image tyoe
  function checkType(file,cb){
    const filetypes=/jpeg|png|gif|jpg/;
    const extname= filetypes.test(path.extname(file.originalname).toLowerCase())
    if(extname){
      return cb(null, true)
    }
    else{
       cb("Error! Images only (png,jpg,jped,gif)")
    }
  }

const getUsers=(req, res, next)=>{
    Users.find()
      .then((users) =>  res.send(users) )
      .catch((err) => res.status(400).json("Error" + err));
}

const addUser=(req,res)=>{
    const user = new Users({
      image:req.file.filename,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    user.save()
    .then(() => res.send("user added"))
    .catch((err) => console.log(err));
  }

const updateUser=(req,res,next)=>{
    Users.findByIdAndUpdate(req.params.id,{
      image:req.file.filename,
      StdID:req.body.studentID,
      StdName: req.body.name,
      Major: req.body.major,
      College:req.body.college,
    })
    .then(() => res.send("user updated"))
    .catch((err) => res.send("Select Image first"));
  }

const deleteUser=(req,res)=>{
    Users.findOneAndDelete({_id : req.params.id})
    .then(()=> res.send("used deleted"))
    .catch((err) => res.send(err));
}
const searchUser=(req,res)=>{
    Users.findById(req.params.id)
    .then((user)=> res.send(user))
    .catch((err) => res.status(400).json("Error" + err) )
  }

  const createClass = (req,res) =>{
    console.log("create called node")
    const newClass = new Class({
      name: req.body.name,
      teacher: req.body.teacher,
      students: []
    });
    newClass.save()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
  }
  const joinClass = (req,res)=>{
    console.log(req.params.cid)
    Class.findByIdAndUpdate(req.params.cid, { $push: { students: req.params.cid } }).
    then(result => res.send(result))
    .catch((err) => res.status(400).json("Error" + err));
  }
  const getClasses = (req,res)=>{
    Class.find()
    .then((classes) =>  res.send(classes) )
    .catch((err) => res.status(400).json("Error" + err));
  }
  const joinedClasses = (req,res)=>{
    Class.find({"students": {"$in":[req.params.sid]}})
    .then((classes) =>  res.send(classes) )
    .catch((err) => res.status(400).json("Error" + err));
  }
  const createdClasses = (req,res)=>{
    Class.find({teacher: req.params.tid})
    .then((classes) =>  res.send(classes) )
    .catch((err) => res.status(400).json("Error" + err));
  }


module.exports={upload, getUsers, addUser, updateUser, deleteUser, searchUser, createClass, joinClass, getClasses, joinedClasses, createdClasses}