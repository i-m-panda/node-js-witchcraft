import request from "supertest";
import { createApp } from "../src/app.js";
import { createMemoryUserRepository } from "../src/repositories/user-repository.js";

const jwtSecret = "test-secret";
let app;
let userId;
let token;
const locationResponse = (body, ok = true) => ({
    ok,
    json: async () => body,
});

beforeEach(async () => {
    app = createApp({
        userRepository: createMemoryUserRepository(),
        jwtSecret,
        fetchLocation: async () => locationResponse([{
            display_name: "Berlin, Germany",
            lat: "52.5174",
            lon: "13.3951",
        }]),
    });
    await request(app).post("/users").send({ name: "Ada", email: "ada@example.com", password: "password123" });
    const login = await request(app).post("/auth/login").send({ email: "ada@example.com", password: "password123" });
    userId = login.body.data.user.id;
    token = login.body.data.token;
});

test("returns a health response", async () => {
    const response = await request(app).get("/health");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "ok" });
});

test("requires authentication to read a user", async () => {
    const response = await request(app).get(`/users/${userId}`);
    expect(response.status).toBe(401);
});

test("allows the owner to update their name", async () => {
    const response = await request(app)
        .patch(`/users/${userId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ name: "Ada Lovelace" });
    expect(response.status).toBe(200);
    expect(response.body.data.name).toBe("Ada Lovelace");
});

test("returns a location from the location service", async () => {
    const response = await request(app).get("/location/Berlin");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
        data: {
            name: "Berlin, Germany",
            latitude: "52.5174",
            longitude: "13.3951",
        },
    });
});

test("returns not found when the location service has no result", async () => {
    app = createApp({
        userRepository: createMemoryUserRepository(),
        jwtSecret,
        fetchLocation: async () => locationResponse([]),
    });

    const response = await request(app).get("/location/Unknown");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Location not found" });
});

test("returns a bad gateway when the location service fails", async () => {
    app = createApp({
        userRepository: createMemoryUserRepository(),
        jwtSecret,
        fetchLocation: async () => locationResponse(null, false),
    });

    const response = await request(app).get("/location/Berlin");

    expect(response.status).toBe(502);
    expect(response.body).toEqual({ error: "Location service failed" });
});
