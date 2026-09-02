export function createLocationController(locationService) {
    return {
        async getCoordinates(req, res, next) {
            try {
                const location = await locationService.findCoordinates(req.city);
                if (!location) return res.status(404).json({ error: "City not found" });
                res.json(location);
            } catch (error) {
                next(error);
            }
        },
    };
}
