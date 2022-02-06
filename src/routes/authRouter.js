import { Router } from "express";
import { login, signUp } from "../controllers/authController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import newUserSchema from "../schemas/newUserSchema.js";
import loginSchema from "../schemas/loginSchema.js";

const authRouter = Router();

authRouter.post(
  "/auth/sign-up",
  validateSchemaMiddleware(newUserSchema),
  signUp
);

authRouter.post("/auth/login", validateSchemaMiddleware(loginSchema), login);

export default authRouter;
