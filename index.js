"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(require("http"));
const cluster = require('cluster');
const os = __importStar(require("os"));
const utils_1 = require("./src/utils/utils");
const userController_1 = require("./src/controllers/userController");
require("dotenv/config");
const PORT = process.env.PORT || 4000;
const server = http.createServer((req, res) => {
    // const isId: boolean = req.url.match(/\/api\/users\/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi) ? true : false
    var _a;
    const url = (_a = req === null || req === void 0 ? void 0 : req.url) === null || _a === void 0 ? void 0 : _a.split('/');
    const endPoint = (url[1] === 'api' && url[2] === 'users') ? true : false;
    const id = url[3];
    const isId = (id && id != '') ? true : false;
    if (!endPoint) {
        (0, utils_1.res404)(req, res);
    }
    else if (req.method === 'GET' && isId) {
        (0, userController_1.getUser)(req, res, id);
    }
    else if (req.method === 'PUT' && isId) {
        (0, userController_1.updateUser)(req, res, id);
    }
    else if (req.method === 'DELETE' && isId) {
        (0, userController_1.deleteUser)(req, res, id);
    }
    else if (req.method === 'GET' && !isId) {
        (0, userController_1.getUsers)(req, res);
    }
    else if (req.method === 'POST' && !isId) {
        (0, userController_1.createUser)(req, res);
    }
    else {
        (0, utils_1.res404)(req, res);
    }
});
module.exports = server;
if (cluster.isPrimary) {
    let cpus = os.cpus().length;
    console.log(`Master ${process.pid} is running.`);
    for (let i = 0; i < cpus; i++) {
        cluster === null || cluster === void 0 ? void 0 : cluster.fork(); // создаёт новый экземпляер приложения
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`A worker with ID ${worker.process.pid} died.`);
        server.listen(PORT, () => {
            console.log(`Run on PORT ${PORT}....`);
        });
    });
}
else {
    console.log(`Worker: ${cluster.worker.id}, pid: ${process.pid}, port ${PORT}`);
    server.listen(PORT, () => {
        console.log(`Run on PORT ${PORT}....`);
    });
}
//# sourceMappingURL=index.js.map