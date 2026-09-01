import bcrypt from "bcryptjs";

const saltRounds = 12;

export function hashPassword(password) {
    return bcrypt.hash(password, saltRounds);
}

export function verifyPassword(password, passwordHash) {
    return bcrypt.compare(password, passwordHash);
}
