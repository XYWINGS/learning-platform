import bodyParser from "body-parser";
import  express  from "express";
import userRouter from "./src/routes/user.route";
import * as dotenv from 'dotenv';
import mongoose from "mongoose";
dotenv.config();

const cors = require("cors");
const app= express()

app.use(cors());
app.use(bodyParser.json())
app.use(userRouter)

const URL:any=process.env.DB_URL;

const options:any= {
  useNewUrlParser: true,
  // useUnifiedTopology: true
};


mongoose.connect(URL,options)

const connection =mongoose.connection;
connection.once("open",()=>{
    console.log("db connect success!");
})

app.listen(8080,()=>{
  console.log('Sever is runing on port 8080')
})







    