import { Router } from "express";
import "express-async-errors";
import { AuthController } from "./controllers/auth";

const routes = Router();

routes.post("/auth/sign-up", AuthController.signUp);
routes.post("/auth/sign-in", AuthController.signIn);

export default routes;
