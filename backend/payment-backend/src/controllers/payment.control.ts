import { Request, Response } from "express";
import { addpayment, findPaymentById, deletePaymentById, getPayment, getPaymentById, updatePaymentById, findPaymentByname, getallPayment } from "../services/course.service";


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

export const getAllPayment = async (req: Request, res: Response) => {
    try {
        let Id = req.params.id

        const course = await getPayment(Id);
        res.status(200).send(course)

    } catch (err: any) {
        return res.status(400).send({
            err: "please ckeck error",
        });
    }
}


export const getAllPayment1 = async (req: Request, res: Response) => {
    try {
        

        const course = await getallPayment();
        res.status(200).send(course)

    } catch (err: any) {
        return res.status(400).send({
            err: "please ckeck error",
        });
    }
}

export const getPaymentbyId = async (req: Request, res: Response) => {
    try {
        let Id = req.params.id
        //validate user

        const course = await getPaymentById(Id);
        res.status(200).send(course)

    } catch (err: any) {
        return res.status(400).send({
            err: "please ckeck error",
        });
    }
}

export const updatePayment = async (req: Request, res: Response) => {
    try {
        let Id = req.params.id
    
        const course = await updatePaymentById(Id, req.body);
        res.status(200).send(course)

    } catch (err: any) {
        return res.status(400).send({
            err: "please ckeck error",
        });
    }
}

export const deletePayment = async (req: Request, res: Response) => {
    try {
        let Id = req.params.id
      
        const course = await deletePaymentById(Id);
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