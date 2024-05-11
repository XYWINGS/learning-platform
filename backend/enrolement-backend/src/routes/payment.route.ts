import { body } from "express-validator";
import {  validate } from "../utils/validator";
import { Router } from "express";
import {paymentRegister,deleteCourse,getAllCourse,getAllCourse1,getCoursebyId,updateuser, updatecourse } from "../controllers/course.control";


const courseRouter = Router();

courseRouter.post("/addpayment",paymentRegister)

// courseRouter.post("/enrollecourse",enrollecourse)

courseRouter.delete("/courseDelete/:id",deleteCourse)

courseRouter.get("/getcourse/:id",getAllCourse)

courseRouter.get("/getallusers",getAllCourse1)

courseRouter.get("/getcourseId/:id",getCoursebyId)

courseRouter.put("/updateuser/:id",updateuser)

courseRouter.put("/updatecourse/:id",updatecourse)


export default courseRouter;