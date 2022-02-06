import { Router } from "express";
import {
  deposit,
  withdraw,
  transaction,
} from "../controllers/transactionController.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";

const transactionRouter = Router();

transactionRouter.use(validateTokenMiddleware);

transactionRouter.post("/home/deposit", deposit);

transactionRouter.post("/home/withdraw", withdraw);

transactionRouter.get("/home", transaction);

export default transactionRouter;
