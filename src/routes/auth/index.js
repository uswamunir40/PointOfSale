import AuthController from "../../controller/auth/index.js";
import { Router } from "express";
import authenticateMiddleware from "../../middleware/auth.js";
import AuthValidators from "../../validators/auth/index.js";

const authRouter = Router();

authRouter.post("/auth/signup", AuthValidators.signUp, AuthController.signup);

// authRouter.post("/auth/signin", AuthController.signin);
authRouter.post("/auth/signIn", AuthValidators.signIn, AuthController.signin);

export default authRouter;
