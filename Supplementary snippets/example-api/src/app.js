import express from "express";
import { createUserRouter } from "./routes/user-routes.js";
import { createLocationRouter } from "./routes/location-routes.js";
import { errorHandler } from "./middleware/error-handler.js";
import { createUserService } from "./services/user-service.js";
import { createLocationService } from "./services/location-service.js";

export function createApp({ userRepository, jwtSecret, fetchLocation = fetch }) {
    const app = express();
    const userService = createUserService(userRepository);
    const locationService = createLocationService(fetchLocation);

    app.use(express.json({ limit: "1mb" }));
    app.get("/health", (req, res) => res.json({ status: "ok" }));
    app.use(createLocationRouter(locationService));
    app.use(createUserRouter(userService, jwtSecret));
    app.use(errorHandler);
    return app;
}
