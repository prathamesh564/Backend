import mongoose from "mongoose";
import express from "express";
import studentRoutes from "./routes/studentRoutes.js";
const app =express();
app.use(express.json());

mongoose
.connect('mongodb+srv://prathameshvshenoy_db_user:Vvvpsh77@cluster0.gnmus1t.mongodb.net/College_data')
.then(() => console.log('Connected to MongoDB'))
.catch((err)=> console.log(err));
 app.use("/api/students",studentRoutes);
 app.listen(3000,()=>{
    console.log("Server is running on port 3000");
}   
);