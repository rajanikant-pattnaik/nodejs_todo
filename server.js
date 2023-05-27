import { app } from "./app.js";
import connectDb from "./config/connectDb.js";

connectDb();

app.listen(4000,()=>{
    console.log("server is running at port 4000");
})