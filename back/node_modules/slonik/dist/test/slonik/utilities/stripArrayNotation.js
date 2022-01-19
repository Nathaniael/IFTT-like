"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const stripArrayNotation_1 = require("../../../src/utilities/stripArrayNotation");
(0, ava_1.default)('strips array notation', (t) => {
    t.is((0, stripArrayNotation_1.stripArrayNotation)('foo'), 'foo');
    t.is((0, stripArrayNotation_1.stripArrayNotation)('foo[]'), 'foo');
    t.is((0, stripArrayNotation_1.stripArrayNotation)('foo[][]'), 'foo');
});
//# sourceMappingURL=stripArrayNotation.js.map