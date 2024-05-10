import mongoose, { Schema } from "mongoose";

const userSchema=new Schema({
    name:String,
    IT_no: String,
    role:String,
    password:{
         required:true,
         type:String,
    },
    email:{
        requirde:true,
        type:String
    },
    course:{
        type:[]
    }
    
})
const User=mongoose.model("User",userSchema);
export default User;