import { Router } from "express";
import "express-async-errors";
import { UserController } from "./controllers/user";

const routes = Router();

routes.post("/user", UserController.create);

export default routes;
