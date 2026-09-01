import express from "express";
import { createLocationController } from "../controllers/location-controller.js";

export function createLocationRouter(locationService) {
    const router = express.Router();
    const controller = createLocationController(locationService);

    router.get("/location/:city", controller.getByCity);

    return router;
}
