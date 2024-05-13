import { body } from "express-validator";
import {  validate } from "../utils/validator";
import { Router } from "express";
import {userRegister,deleteCourse,getAllUser,getAllUser1,getUserbyId,updateuser, updateUser } from "../controllers/enrolement.control";

const courseRouter = Router();

courseRouter.post("/adduser",userRegister)

// courseRouter.post("/enrollecourse",enrollecourse)

courseRouter.delete("/userDelete/:id",deleteCourse)

courseRouter.get("/getuser/:id",getAllUser)

courseRouter.get("/getallusers",getAllUser1)

courseRouter.get("/getuserId/:id",getUserbyId)

courseRouter.put("/updateuser/:id",updateuser)

courseRouter.put("/updatecourse/:id",updateUser)


export default courseRouter;