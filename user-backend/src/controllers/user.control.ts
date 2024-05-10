import { Request, Response } from "express";
import { findUserById, login, register } from "../services/user.service";


export const currentUser= async (req:Request, res:Response) => {
     const currentUser=req.user;
     
     try {
      if (!currentUser){
        return res.status(400).send({err:'User not longer in'})
      }
     
      const userDoc = await findUserById(currentUser.email);
      console.log(userDoc)
      // const user=userDoc?.toJOSN()as any;
      // console.log(user)
      delete userDoc?.password
      
  
      res.status(200).json(userDoc)
      } catch (err) {
        res.status(400).send({err:err})
     }

    

}

export const userRegister= async (req:Request, res:Response) => {
  try {
    const { name, IT_no, password, email } = req.body;

console.log(name)
    const existingUser = await findUserById(email);
    if (existingUser) {
      return res.status(400).send({
        err: "User Already Exits",
      });
    }

    await register(email, name, IT_no, password,"student");
    const payload=await login(email,password)

    res.status(200).send(payload)
  } catch (err: any) {
    console.log(err);
  }
}

export const userLogin= async(req:Request,res:Response)=>{

  try{

      const {  password, email } = req.body;
     const payload=await login(email,password)

      res.status(200).send(payload)
  }catch(err:any){
    res.status(400).send({err:err.massage})
  }
}


