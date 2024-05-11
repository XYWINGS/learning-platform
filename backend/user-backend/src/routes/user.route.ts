import { body } from "express-validator";
import { authGurd, validate } from "../utils/validator";
import { Router } from "express";
import { currentUser, userLogin, userRegister } from "../controllers/user.control";

const userRouter = Router();

userRouter.post("/register",validate([
  body("email").isEmail(),
  body("password").isLength({min:5})
]),userRegister)


userRouter.post("/login", validate([
    body("email").isEmail(),
    body("password").isLength({min:5})
]),userLogin)

userRouter.get("/current-user",authGurd,currentUser)
export default userRouter;