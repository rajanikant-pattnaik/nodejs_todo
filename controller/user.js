import { user } from "../models/user.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import { sendCookie } from "../utils/features.js";
export const login=async(req,res,next)=>{
 const {email,password}=req.body;
 const newUser=await user.findOne({email}).select("+password")
 if(!newUser){
   res.json({
      success:true,
      message:"Invalid email or password"
   })
 }
 const isMatched=await bcrypt.compare(password,newUser.password);
 if(!isMatched){
   res.json({
      success:true,
      message:"Invalid email or password"
   })
 }
 else sendCookie(newUser,res,`Welcome back ${newUser.name}`,200);
}

export const getAllUser=async(req,res)=>{
   const userData=await user.find({});
   res.json({
      success:true,
      userData
   })
}

export const register=async(req,res)=>{
   const {name,email,password}=req.body;

   let newUser=await user.findOne({email});
   if(newUser) res.status(404).json({
      success:false,
      message:"User already exist"
   })

  else {const hashedPassword=await bcrypt.hash(password,10);

   newUser=await user.create({name,email,password:hashedPassword});
   sendCookie(newUser,res,"Registered Successfully",201);
   }
}

export const getUserDetails=(req,res)=>{
   
   res.status(200).json({
      success:true,
      user:req.currUser
   })
}

export const logout=(req,res)=>{
   res.status(200).cookie('token',"",{expires:new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Develpoment" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Develpoment" ? false : true,
    }).json({
      success:true,
      message:"Logout successfully"
   })
}
