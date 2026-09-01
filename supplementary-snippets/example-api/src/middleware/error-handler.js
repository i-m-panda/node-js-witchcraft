export function errorHandler(error, req, res, next) {
    console.error(error);
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ error: statusCode === 500 ? "Internal server error" : error.message });
}
