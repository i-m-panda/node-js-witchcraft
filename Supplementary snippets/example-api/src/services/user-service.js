import { hashPassword, verifyPassword } from "../utils/password.js";

export function createUserService(userRepository) {
    return {
        async register({ name, email, password }) {
            const normalizedEmail = email.toLowerCase();
            if (await userRepository.findByEmail(normalizedEmail)) {
                const error = new Error("Email already exists");
                error.statusCode = 409;
                throw error;
            }

            return userRepository.create({
                name,
                email: normalizedEmail,
                passwordHash: await hashPassword(password),
                role: "user",
            });
        },
        async authenticate(email, password) {
            const user = await userRepository.findByEmail(email.toLowerCase());
            if (!user || !(await verifyPassword(password, user.passwordHash))) {
                const error = new Error("Invalid email or password");
                error.statusCode = 401;
                throw error;
            }
            return user;
        },
        async getById(id) {
            const user = await userRepository.findById(id);
            if (!user) {
                const error = new Error("User not found");
                error.statusCode = 404;
                throw error;
            }
            return user;
        },
        async update(id, changes) {
            const user = await userRepository.updateById(id, changes);
            if (!user) {
                const error = new Error("User not found");
                error.statusCode = 404;
                throw error;
            }
            return user;
        },
        delete(id) {
            return userRepository.deleteById(id);
        },
    };
}

export function publicUser(user) {
    return { id: user._id.toString(), name: user.name, email: user.email, role: user.role };
}
