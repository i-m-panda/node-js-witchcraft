import { hashPassword, verifyPassword } from "../src/utils/password.js";

test("hashes a password without returning the original value", async () => {
    const password = "password123";
    const passwordHash = await hashPassword(password);

    expect(passwordHash).not.toBe(password);
    expect(passwordHash).toMatch(/^\$2[aby]\$/);
});

test("verifies the correct password", async () => {
    const passwordHash = await hashPassword("password123");

    await expect(verifyPassword("password123", passwordHash)).resolves.toBe(true);
});

test("rejects an incorrect password", async () => {
    const passwordHash = await hashPassword("password123");

    await expect(verifyPassword("wrong-password", passwordHash)).resolves.toBe(false);
});

test("rejects a malformed password hash", async () => {
    await expect(verifyPassword("password123", "not-a-bcrypt-hash")).resolves.toBe(false);
});