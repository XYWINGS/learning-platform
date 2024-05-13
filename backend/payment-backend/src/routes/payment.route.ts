import { body } from "express-validator";
import {  validate } from "../utils/validator";
import { Router } from "express";
import {paymentRegister,deletePayment,getAllPayment,getAllPayment1,getPaymentbyId,updatePayment } from "../controllers/payment.control";


const courseRouter = Router();

courseRouter.post("/addpayment",paymentRegister)

// courseRouter.post("/enrollecourse",enrollecourse)

courseRouter.delete("/paymentDelete/:id",deletePayment)

courseRouter.get("/getPayment/:id",getAllPayment)

courseRouter.get("/getallpayment",getAllPayment1)

courseRouter.get("/getpaymentId/:id",getPaymentbyId)

courseRouter.put("/updatepayment/:id",updatePayment)


export default courseRouter;