import express, { response } from "express"
import User from "../model/m_users.js"
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";

export const registerUser = async (req, res) => {
    try {
      const { name, email, password ,companyName} = req.body;
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        companyName: companyName || undefined,
        role: "customer",
      });
  
      return res.status(201).json({
        token: generateToken(newUser),
        message: "Registration successful",
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
       
        },
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
export const loginUser=async(req, res)=>{
    try {
        const {email , password}= req.body;
        const user= await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User Not found with this email"});

        }
        const isMatch = await bcrypt.compare(password , user.password);
        if (!isMatch){
            return res.status(400).json({message:"Password didnot not match for email"});

        }
return res.status(200).json({
token:generateToken(user),
message:"Login SUccessfull",
user:{id:user._id,
    name:user.name,
    email:user.email,
    role:user.role
}

});

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}