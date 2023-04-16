import { Router } from "express";
import { UsersController } from "../controllers/UsersController";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

const usersRoutes = Router();

const controller = new UsersController();

usersRoutes.get("/list", controller.list);
usersRoutes.post("/create", controller.create);
usersRoutes.get("/show/:id", controller.show);
usersRoutes.delete("/delete/:id", ensureAuthenticate, controller.delete);
usersRoutes.put("/update/:id", controller.update);

export { usersRoutes };
