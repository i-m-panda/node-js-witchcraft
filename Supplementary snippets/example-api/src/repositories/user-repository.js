import mongoose from "mongoose";
import User from "../models/user-model.js";

export function createMongoUserRepository({ userModel = User, mongooseApi = mongoose } = {}) {
    return {
        async findByEmail(email) {
            return userModel.findOne({ email }).select("+passwordHash").lean();
        },
        async findById(id) {
            if (!mongooseApi.isValidObjectId(id)) return null;
            return userModel.findById(id).lean();
        },
        async create(user) {
            return new userModel(user).save().then((created) => created.toObject());
        },
        async updateById(id, changes) {
            return userModel.findByIdAndUpdate(id, changes, { new: true, runValidators: true }).lean();
        },
        async deleteById(id) {
            if (!mongooseApi.isValidObjectId(id)) return false;
            const result = await userModel.deleteOne({ _id: id });
            return result.deletedCount === 1;
        },
    };
}

export function createMemoryUserRepository() {
    const users = [];
    let nextId = 1;

    return {
        async findByEmail(email) {
            return users.find((user) => user.email === email) || null;
        },
        async findById(id) {
            return users.find((user) => user._id.toString() === id.toString()) || null;
        },
        async create(user) {
            const created = { ...user, _id: String(nextId++) };
            users.push(created);
            return created;
        },
        async updateById(id, changes) {
            const user = await this.findById(id);
            if (!user) return null;
            Object.assign(user, changes);
            return user;
        },
        async deleteById(id) {
            const index = users.findIndex((user) => user._id.toString() === id.toString());
            if (index === -1) return false;
            users.splice(index, 1);
            return true;
        },
    };
}
