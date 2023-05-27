import express from "express";
import dotenv from "dotenv";
import userRouter from "./router/user.js";
import taskRouter from "./router/task.js";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middleware/error.js";
import cors from 'cors';
dotenv.config();

export const app=express();

app.use(express.json())
app.use(cookieParser());
app.use(
    cors({
      origin: [process.env.FRONTEND_URL],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );

app.use("/api/v1",userRouter);
app.use("/api/v1/task",taskRouter);


app.get('/',(req,res)=>{
    res.send('Nice')
})

app.use(errorMiddleware);