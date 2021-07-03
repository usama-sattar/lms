const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema =new Schema({
    image:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type: String
    },
    type:{
        type:String
    },
    marks:[],
    
   
},
    {
      timestamps: true,
    }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
