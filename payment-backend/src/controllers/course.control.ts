import { Request, Response } from "express";
import { addpayment, findcourseById, deleteCourseById, getCourse, getCourseById, updateCourseById, findcourseByname, getallCourse } from "../services/course.service";


export const paymentRegister = async (req: Request, res: Response) => {
    try {
     
        const course = await addpayment(req.body);
        res.status(200).send(course)
console.log(course)
    } catch (err: any) {
        console.log(err);
        return res.status(400).send({
            err: "please ckeck error",
        });
    }
}

export const getAllCourse = async (req: Request, res: Response) => {
    try {
        let Id = req.params.id

        const course = await getCourse(Id);
        res.status(200).send(course)

    } catch (err: any) {
        return res.status(400).send({
            err: "please ckeck error",
        });
    }
}


export const getAllCourse1 = async (req: Request, res: Response) => {
    try {
        

        const course = await getallCourse();
        res.status(200).send(course)

    } catch (err: any) {
        return res.status(400).send({
            err: "please ckeck error",
        });
    }
}

export const getCoursebyId = async (req: Request, res: Response) => {
    try {
        let Id = req.params.id
        //validate user

        const course = await getCourseById(Id);
        res.status(200).send(course)

    } catch (err: any) {
        return res.status(400).send({
            err: "please ckeck error",
        });
    }
}

export const updatecourse = async (req: Request, res: Response) => {
    try {
        let Id = req.params.id
    
        const course = await updateCourseById(Id, req.body);
        res.status(200).send(course)

    } catch (err: any) {
        return res.status(400).send({
            err: "please ckeck error",
        });
    }
}

export const deleteCourse = async (req: Request, res: Response) => {
    try {
        let Id = req.params.id
      
        const course = await deleteCourseById(Id);
        res.status(200).send(course)

    } catch (err: any) {
        return res.status(400).send({
            err: "please ckeck error",
        });
    }
}


// export const enrollecourse = async (req: Request, res: Response) => {
//     try {

     

//         const course = await findcourseByname(req.body.code, req.body.c_name);
//         if (!course) {
//             return res.status(400).send({
//                 err: "No matching course found",
//             });
//         }

//         const updateuser= await updateUser(user._id,course._id)

//         if (!updateuser) {
//             return res.status(400).send({
//                 err: "already enrolled",
//             });
//         }

//         res.status(200).send(updateuser)

//     } catch (err: any) {
//         return res.status(400).send({
//             err: "please ckeck error",
//         });
//     }
// }