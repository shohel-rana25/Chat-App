import User from "../Models/userModel.js"
import bcrypt from 'bcrypt';

export const registerUser=async(req, res)=>{
    try {
        const {username, fullname ,gender,email, password,profilePhot}=req.body;
        
        //if user already exit
        const existuser=await User.findOne({email});
        if(existuser)return res.status(400).json({
            message:"User already exists"
        })

        // hash password
        const hashpassword=await bcrypt.hash(password, 10);
        // save user
        const newUser=new User({ 
            username, 
            fullname ,
            gender,
            email, 
            password:hashpassword,
            profilePhot
        })

        await newUser.save();
        return res.status(200).json({
            message : "User registered successfully"
        })
    }catch (error) {
        console.log(error);
        res.status(500).json({message : error.message});
    }
};

export const loginUser=async (req, res)=>{
    try {
        const {email, password}=req.body;
        // check user exist?
        const user=await User.findOne({email});

        if(!user){
            return res.status(404).json({
                message : "User not found"
            })
        }

        //debug
        // console.log(" request body ", req.body);
        // console.log("user found : ", user? true:false);

        // compare password
        const isMatch=await bcrypt.compare(password, user.password);

        if(!isMatch)
        {
            return res.status(400).json({
                message : "Invalid User"
            })
        }

        return res.status(200).json({
            message : "Login Successful",
            user:{
                id:user._id,
                username : user.username,
                fullname:user.fullname,
                gender:user.gender,
                email:user.email,
                password:user.password,
                profilePhoto:user.profilePhoto
            },
        });
    } catch (error) {
         res.status(500).json({message : error.message});
    }
}

export const logoutUser=(req, res)=>{
    try {
        
    } catch (error) {
         res.status(500).json({message : error.message});
    }
}