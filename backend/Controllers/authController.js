import User from "../Models/userModel.js"
import bcrypt from 'bcrypt';
import jwtToken from "../utils/jwtwebToken.js";

export const registerUser=async(req, res)=>{
    try {
        const {username, fullname ,gender,email, password,profilePhoto}=req.body;
        
        //if user already exit
        const existuser=await User.findOne({email});
        if(existuser)return res.status(400).json({
            message:"User already exists"
        })

        const profileBoy = profilePhoto || `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const profileGirl = profilePhoto || `https://avatar.iran.liara.run/public/girl?username=${username}`;


        // hash password
        const hashpassword=await bcrypt.hash(password, 10);
        // save user
        const newUser=new User({ 
            username, 
            fullname ,
            gender,
            email, 
            password:hashpassword,
            profilePhoto:gender=="male"?profileBoy : profileGirl
        })

        await newUser.save();
        jwtToken(newUser._id,res);
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
        
        jwtToken(user._id,res);
        return res.status(200).json({
            message : "Login Successful",
            user:{
                id:user._id,
                username : user.username,
                fullname:user.fullname,
                gender:user.gender,
                email:user.email,
                profilePhoto:user.profilePhoto
            },
        });
    } catch (error) {
         res.status(500).json({message : error.message});
    }
}

export const logoutUser=(req, res)=>{
    try {

        res.cookie("jwt", '',{
            maxAge:0,
            httpOnly:true,
            sameSite:"strict",
            secure:process.env.SECURE!='development'
        })
        res.status(200).send({message:"User logout"})
        
    } catch (error) {
         res.status(500).json({message : error.message});
    }
}


export const getmethod=async(req, res)=>{
    try {
        const users=await User.find();
        
        //  console.log('Users fetched:', users);
        
        res.status(200).json({users});
         
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}