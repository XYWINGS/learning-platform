import { body } from "express-validator";
import {  validate } from "../utils/validator";
import { Router } from "express";
import {courseRegister,deleteCourse,getAllCourse,getAllCourse1,getCoursebyId,updatecourse } from "../controllers/course.control";


const courseRouter = Router();

courseRouter.post("/courseRegister",courseRegister)



courseRouter.delete("/courseDelete/:id",deleteCourse)

courseRouter.get("/getcourse/:id",getAllCourse)

courseRouter.get("/getallcourse",getAllCourse1)

courseRouter.get("/getcourseId/:id",getCoursebyId)

courseRouter.put("/updatecourse/:id",updatecourse)


export default courseRouter;