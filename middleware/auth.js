import { user } from "../models/user.js";
import jwt from "jsonwebtoken";

export const isAuthentcated=async(req,res,next)=>{
    const id="dhmvjdkd"

   const {token}=req.cookies;
   
   if(!token){
      return res.status(404).json({
         success:false,
         message:"Login first"
      })
   }

    const decoded=jwt.verify(token,process.env.JWT_SECRET);
   req.currUser=await user.findById(decoded._id);
   next();
}