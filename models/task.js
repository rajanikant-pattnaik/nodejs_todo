import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
      type:String,
      required:true
    },
    isCompleted:{
      type:Boolean,
      defalut:false
    },
    user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"users",
      required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
  });
  
export const task= mongoose.model("Task", userSchema);