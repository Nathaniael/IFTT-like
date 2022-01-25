"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUid = void 0;
const hyperid_1 = __importDefault(require("hyperid"));
const generateHyperid = (0, hyperid_1.default)({
    fixedLength: false,
    urlSafe: true,
});
const createUid = () => {
    return generateHyperid();
};
exports.createUid = createUid;
//# sourceMappingURL=createUid.js.map