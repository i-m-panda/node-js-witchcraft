export function createLocationController(locationService) {
    return {
        async getByCity(req, res, next) {
            try {
                const location = await locationService.findByCity(req.params.city);
                res.json({ data: location });
            } catch (error) {
                next(error);
            }
        },
    };
}
