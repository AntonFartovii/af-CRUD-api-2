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
exports.User = void 0;
// @ts-ignore
const { v4: uuidv4 } = require('uuid');
// import { uuidv4 } from 'uuid'
// @ts-ignore
const path = require('path');
// @ts-ignore
const fs_1 = require("fs");
class User {
    constructor(name, age, id = null, hobbies = []) {
        this.name = name;
        this.age = age;
        this.id = uuidv4();
        this.hobbies = hobbies;
        this.filePath = path.join(__dirname, 'data', 'users.json');
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            let users = yield User.getAll();
            users.push(this.toJSON());
            (0, fs_1.createWriteStream)(this.filePath).write(JSON.stringify(users));
        });
    }
    static getAll() {
        let body = '';
        return new Promise((resolve, reject) => {
            (0, fs_1.createReadStream)(path.join(__dirname, 'data'))
                .on('error', (err) => {
                reject(err);
            })
                .on('data', (chunk) => {
                body += chunk.toString();
            })
                .on('end', () => {
                resolve(JSON.parse(body));
            });
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield User.getAll();
            const user = users.find((u) => u.id === id);
            if (user) {
                return user;
            }
            else {
                throw new Error('400');
            }
        });
    }
    getId() {
        return this.id;
    }
    toJSON() {
        return {
            name: this.name,
            age: this.age,
            id: this.id
        };
    }
}
exports.User = User;
//# sourceMappingURL=user.js.map