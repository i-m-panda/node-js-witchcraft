import express from "express";
import { validateCity } from "../middleware/validate-city.js";
import { createLocationController } from "../controllers/location-controller.js";

export function createLocationRouter(locationService) {
    const router = express.Router();
    const controller = createLocationController(locationService);

    router.get("/location", validateCity, controller.getCoordinates);
    return router;
}
