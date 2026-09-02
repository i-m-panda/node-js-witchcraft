import express from "express";
import { errorHandler } from "./middleware/error-handler.js";
import { createLocationRouter } from "./routes/location-routes.js";
import { createLocationService } from "./services/location-service.js";

export function createApp(locationRepository) {
    const app = express();
    app.use(createLocationRouter(createLocationService(locationRepository)));
    app.use(errorHandler);
    return app;
}
