"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const countArrayDimensions_1 = require("../../../src/utilities/countArrayDimensions");
(0, ava_1.default)('returns the number of array dimensions', (t) => {
    t.is((0, countArrayDimensions_1.countArrayDimensions)('foo'), 0);
    t.is((0, countArrayDimensions_1.countArrayDimensions)('foo[]'), 1);
    t.is((0, countArrayDimensions_1.countArrayDimensions)('foo[][]'), 2);
});
//# sourceMappingURL=countArrayDimensions.js.map