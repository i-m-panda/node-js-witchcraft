import express from "express";
import multer from "multer";
import { requireAuth, requireOwnerOrAdmin } from "../middleware/auth.js";
import { validateUpdate, validateUser } from "../middleware/validate.js";
import { createUserController } from "../controllers/user-controller.js";

const upload = multer({ dest: "uploads/", limits: { fileSize: 5 * 1024 * 1024 } });

export function createUserRouter(userService, jwtSecret) {
    const router = express.Router();
    const controller = createUserController(userService, jwtSecret);

    router.post("/users", validateUser, controller.register);

    router.post("/auth/login", controller.login);

    router.get("/users/:id", requireAuth(userService, jwtSecret), requireOwnerOrAdmin, controller.getById);

    router.patch("/users/:id", requireAuth(userService, jwtSecret), requireOwnerOrAdmin, validateUpdate, controller.update);

    router.delete("/users/:id", requireAuth(userService, jwtSecret), requireOwnerOrAdmin, controller.remove);

    router.post("/users/:id/avatar", requireAuth(userService, jwtSecret), requireOwnerOrAdmin, upload.single("avatar"), controller.uploadAvatar);

    return router;
}
