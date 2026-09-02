export function validateCity(req, res, next) {
    const city = req.query.city?.trim();

    if (!city) {
        return res.status(400).json({ error: "city query parameter is required" });
    }

    req.city = city;
    next();
}
