import { Router } from "express";
import { AuthenticateController } from "../controllers/AuthenticateController";

const authenticateRoutes = Router();

const controller = new AuthenticateController();

authenticateRoutes.post("/", controller.create);

export { authenticateRoutes };
