import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    username:{
        type: String,
        required:true,
        unique:true
    },
    fullname:{
        type: String,
        required:true,
    },
    gender:{
        type: String,
        required:true,
        enum:["male", "female"]
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required:true,
    },
    profilePhoto:{
        type: String,
        default:""
    },
},{ timestamps: true});

const User=mongoose.model("User", userSchema);
export default User;