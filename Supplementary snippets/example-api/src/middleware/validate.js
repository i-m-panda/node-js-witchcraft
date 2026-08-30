export function validateUser(req, res, next) {
    const { name, email, password } = req.body;
    if (!name || !email || !password || password.length < 8) {
        return res.status(400).json({ error: "name, email, and a password of 8+ characters are required" });
    }
    next();
}

export function validateUpdate(req, res, next) {
    const allowedFields = ["name"];
    const fields = Object.keys(req.body);
    if (fields.some((field) => !allowedFields.includes(field)) || fields.length === 0) {
        return res.status(400).json({ error: "Only name can be updated" });
    }
    next();
}
