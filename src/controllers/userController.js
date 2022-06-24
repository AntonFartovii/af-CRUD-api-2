"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.getUsers = void 0;
const utils_1 = require("../utils/utils");
const User = require('../users/user');
const validate_1 = require("../utils/validate");
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield User.findAll();
            res.writeHead(200, { 'Content-type': 'application/json' });
            res.end(JSON.stringify(users));
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.getUsers = getUsers;
function getUser(req, res, id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const valid = (0, validate_1.uuidValidateV4)(id);
            if (!valid) {
                res.writeHead(400, { 'Content-type': 'application/json' });
                res.end(JSON.stringify({ message: '400 - ID is not valid ' }));
            }
            const user = yield User.findById(id);
            if (!user) {
                res.writeHead(404, { 'Content-type': 'application/json' });
                res.end(JSON.stringify({ message: '404 - user not found ' }));
            }
            else {
                res.writeHead(200, { 'Content-type': 'application/json' });
                res.end(JSON.stringify(user));
            }
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.getUser = getUser;
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = yield (0, utils_1.getPostData)(req);
            const { name, age, hobbies } = JSON.parse(body);
            if (!name || !age || !hobbies) {
                res.writeHead(400, { 'Content-type': 'application/json' });
                res.end(JSON.stringify({ message: '400 - body does not contain required fields' }));
                return;
            }
            const user = { name, age, hobbies };
            const newUser = yield User.create(user);
            res.writeHead(201, { 'Content-type': 'application/json' });
            return res.end(JSON.stringify(newUser));
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.createUser = createUser;
function updateUser(req, res, id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const valid = (0, validate_1.uuidValidateV4)(id);
            if (!valid) {
                res.writeHead(400, { 'Content-type': 'application/json' });
                res.end(JSON.stringify({ message: '400 - ID is not valid ' }));
            }
            const user = yield User.findById(id);
            if (!user) {
                res.writeHead(404, { 'Content-type': 'application/json' });
                res.end(JSON.stringify({ message: '404 - user not found ' }));
            }
            else {
                const body = yield (0, utils_1.getPostData)(req);
                const { name, age, hobbies } = JSON.parse(body);
                const newParams = {
                    name: name || user.name,
                    age: age || user.age,
                    hobbies: hobbies || user.hobbies
                };
                const updateUser = User.update(newParams, id);
                res.writeHead(201, { 'Content-type': 'application/json' });
                res.end(JSON.stringify(yield User.findById(id)));
            }
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.updateUser = updateUser;
function deleteUser(req, res, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const valid = (0, validate_1.uuidValidateV4)(id);
        if (!valid) {
            res.writeHead(400, { 'Content-type': 'application/json' });
            res.end(JSON.stringify({ message: '400 - ID is not valid ' }));
        }
        const user = yield User.findById(id);
        try {
            if (!user) {
                res.writeHead(404, { 'Content-type': 'application/json' });
                res.end(JSON.stringify({ message: '404 - user not found ' }));
            }
            else {
                yield User.remove(id);
                res.writeHead(204, { 'Content-type': 'application/json' });
                res.end(JSON.stringify({ message: `product ${id} has been deleted` }));
            }
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.deleteUser = deleteUser;
//# sourceMappingURL=userController.js.map