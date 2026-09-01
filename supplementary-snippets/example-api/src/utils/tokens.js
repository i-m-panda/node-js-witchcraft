import jwt from "jsonwebtoken";

export function createToken(user, secret) {
    return jwt.sign({ sub: user._id.toString(), role: user.role }, secret, { expiresIn: "1h" });
}

export function readToken(token, secret) {
    return jwt.verify(token, secret);
}
