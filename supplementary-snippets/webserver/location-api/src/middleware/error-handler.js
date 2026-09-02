export function errorHandler(error, req, res, next) {
    console.error(error);
    res.status(502).json({ error: "Location API unavailable" });
}
