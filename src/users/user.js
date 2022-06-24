"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.findById = exports.findAll = void 0;
const { v4: uuidv4 } = require('uuid');
let memory = [];
function findAll() {
    return new Promise((res, req) => {
        const users = memory;
        res(users);
    });
}
exports.findAll = findAll;
function findById(id) {
    return new Promise((res, req) => {
        const user = memory.find((u) => u.id === id);
        res(user);
    });
}
exports.findById = findById;
function create(user) {
    return new Promise((res, req) => {
        const newUser = Object.assign({ id: uuidv4() }, user);
        memory.push(newUser);
        res(newUser);
    });
}
exports.create = create;
function update(params, id) {
    return new Promise((res, req) => {
        const index = memory.findIndex((u) => u.id === id);
        memory[index] = Object.assign({ id }, params);
        res(memory[index]);
    });
}
exports.update = update;
function remove(id) {
    return new Promise((res, req) => {
        const newMemory = memory.filter((u) => u.id !== id);
        memory = newMemory;
        res('ok');
    });
}
exports.remove = remove;
//# sourceMappingURL=user.js.map