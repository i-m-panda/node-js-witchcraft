import { readToken } from "../utils/tokens.js";

export function requireAuth(userService, secret) {
    return async (req, res, next) => {
        try {
            const header = req.get("authorization");
            const token = header?.startsWith("Bearer ") ? header.slice(7) : null;
            if (!token) return res.status(401).json({ error: "Authentication required" });

            const claims = readToken(token, secret);
            req.user = await userService.getById(claims.sub);
            next();
        } catch {
            res.status(401).json({ error: "Invalid or expired token" });
        }
    };
}

export function requireOwnerOrAdmin(req, res, next) {
    if (req.user.role !== "admin" && req.user._id.toString() !== req.params.id) {
        return res.status(403).json({ error: "Forbidden" });
    }
    next();
}
