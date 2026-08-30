import { jest } from "@jest/globals";
import { createMongoUserRepository } from "../src/repositories/user-repository.js";

const validId = "507f1f77bcf86cd799439011";

function queryReturning(value) {
    return {
        lean: jest.fn().mockResolvedValue(value),
    };
}

function createUserModel() {
    const model = jest.fn((user) => ({
        save: jest.fn().mockResolvedValue({
            ...user,
            _id: validId,
            toObject() {
                return { ...this };
            },
        }),
    }));
    model.findOne = jest.fn();
    model.findById = jest.fn();
    model.findByIdAndUpdate = jest.fn();
    model.deleteOne = jest.fn();
    return model;
}

function createRepository() {
    const userModel = createUserModel();
    const mongooseApi = { isValidObjectId: jest.fn((id) => id === validId) };
    return {
        repository: createMongoUserRepository({ userModel, mongooseApi }),
        userModel,
        mongooseApi,
    };
}

test("finds a user by email and includes the password hash", async () => {
    const { repository, userModel } = createRepository();
    const user = { _id: validId, email: "ada@example.com", passwordHash: "hash" };
    const query = queryReturning(user);
    userModel.findOne.mockReturnValue({
        select: jest.fn().mockReturnValue(query),
    });

    const result = await repository.findByEmail(user.email);

    expect(userModel.findOne).toHaveBeenCalledWith({ email: user.email });
    expect(result).toEqual(user);
});

test("does not query MongoDB for an invalid user id", async () => {
    const { repository, userModel } = createRepository();

    const result = await repository.findById("invalid-id");

    expect(result).toBeNull();
    expect(userModel.findById).not.toHaveBeenCalled();
});

test("creates a user and returns a plain object", async () => {
    const { repository, userModel } = createRepository();
    const user = { name: "Ada", email: "ada@example.com", passwordHash: "hash", role: "user" };

    const result = await repository.create(user);

    expect(userModel).toHaveBeenCalledWith(user);
    expect(result).toMatchObject({ ...user, _id: validId });
});

test("updates a user with validators enabled", async () => {
    const { repository, userModel } = createRepository();
    const updatedUser = { _id: validId, name: "Ada Lovelace" };
    userModel.findByIdAndUpdate.mockReturnValue(queryReturning(updatedUser));

    const result = await repository.updateById(validId, { name: updatedUser.name });

    expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith(
        validId,
        { name: updatedUser.name },
        { new: true, runValidators: true },
    );
    expect(result).toEqual(updatedUser);
});

test("returns whether a user was deleted", async () => {
    const { repository, userModel } = createRepository();
    userModel.deleteOne.mockResolvedValue({ deletedCount: 1 });

    await expect(repository.deleteById(validId)).resolves.toBe(true);
    expect(userModel.deleteOne).toHaveBeenCalledWith({ _id: validId });

    userModel.deleteOne.mockResolvedValue({ deletedCount: 0 });
    await expect(repository.deleteById(validId)).resolves.toBe(false);
});