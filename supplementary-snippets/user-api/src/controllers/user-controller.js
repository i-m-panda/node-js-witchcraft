import { createToken } from "../utils/tokens.js";
import { publicUser } from "../services/user-service.js";

export function createUserController(userService, jwtSecret) {
    return {
        async register(req, res, next) {
            try {
                const user = await userService.register(req.body);
                res.status(201).json({ data: publicUser(user) });
            } catch (error) {
                next(error);
            }
        },

        async login(req, res, next) {
            try {
                const user = await userService.authenticate(req.body.email || "", req.body.password || "");
                res.json({ data: { user: publicUser(user), token: createToken(user, jwtSecret) } });
            } catch (error) {
                next(error);
            }
        },

        async getById(req, res, next) {
            try {
                const user = await userService.getById(req.params.id);
                res.json({ data: publicUser(user) });
            } catch (error) {
                next(error);
            }
        },

        async update(req, res, next) {
            try {
                const user = await userService.update(req.params.id, req.body);
                res.json({ data: publicUser(user) });
            } catch (error) {
                next(error);
            }
        },

        async remove(req, res, next) {
            try {
                const deleted = await userService.delete(req.params.id);
                if (!deleted) return res.status(404).json({ error: "User not found" });
                res.status(204).end();
            } catch (error) {
                next(error);
            }
        },

        uploadAvatar(req, res) {
            if (!req.file) return res.status(400).json({ error: "avatar file is required" });
            res.status(201).json({ data: { filename: req.file.filename, size: req.file.size } });
        },
    };
}
