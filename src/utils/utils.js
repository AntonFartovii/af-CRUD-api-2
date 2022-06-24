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
exports.getPostData = exports.res400 = exports.res404 = void 0;
function res404(req, res) {
    res.writeHead(404, { 'Content-type': 'application/json' });
    res.end(JSON.stringify({ message: '! Error 404 - this end point is not found' }));
}
exports.res404 = res404;
function res400(req, res) {
    res.writeHead(400, { 'Content-type': 'application/json' });
    res.end(JSON.stringify({ message: 'Error 400 - ID is not valid' }));
}
exports.res400 = res400;
function getPostData(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk.toString();
            });
            req.on('end', () => __awaiter(this, void 0, void 0, function* () {
                resolve(body === '' ? '{}' : body);
            }));
        }
        catch (err) {
            reject(err);
        }
    });
}
exports.getPostData = getPostData;
//# sourceMappingURL=utils.js.map