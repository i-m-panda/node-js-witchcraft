import { createToken, readToken } from "../src/utils/tokens.js";

const secret = "test-secret";
const user = { _id: "user-123", role: "user" };

test("creates a token with the user id and role", () => {
    const token = createToken(user, secret);
    const claims = readToken(token, secret);

    expect(claims.sub).toBe("user-123");
    expect(claims.role).toBe("user");
    expect(claims.exp).toBeGreaterThan(claims.iat);
});

test("rejects a token signed with another secret", () => {
    const token = createToken(user, secret);

    expect(() => readToken(token, "another-secret")).toThrow();
});

test("rejects a malformed token", () => {
    expect(() => readToken("not-a-token", secret)).toThrow();
});

test("rejects an expired token", async () => {
    const jwt = await import("jsonwebtoken");
    const expiredToken = jwt.default.sign({ sub: user._id }, secret, { expiresIn: -1 });

    expect(() => readToken(expiredToken, secret)).toThrow("jwt expired");
});