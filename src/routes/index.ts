import { Router } from "express";
import { helloWorldRoutes } from "./HelloWorldRoutes";
import { usersRoutes } from "./UsersRoutes";
import { authenticateRoutes } from "./AuthenticateRoutes";

const routes = Router();

routes.use("/hello-world", helloWorldRoutes);
routes.use("/users", usersRoutes);
routes.use("/sessions", authenticateRoutes);

export { routes };
