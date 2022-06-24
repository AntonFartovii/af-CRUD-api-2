"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isJsonString = exports.bodyValidate = exports.uuidValidateV4 = void 0;
const { validate: uuidValidate } = require('uuid');
const { version: uuidVersion } = require('uuid');
const uuidValidateV4 = (uuid) => {
    return uuidValidate(uuid) && uuidVersion(uuid) === 4;
};
exports.uuidValidateV4 = uuidValidateV4;
const bodyValidate = (body) => {
    return false;
};
exports.bodyValidate = bodyValidate;
function isJsonString(str) {
    try {
        JSON.parse(str);
    }
    catch (e) {
        return false;
    }
    return true;
}
exports.isJsonString = isJsonString;
//# sourceMappingURL=validate.js.map