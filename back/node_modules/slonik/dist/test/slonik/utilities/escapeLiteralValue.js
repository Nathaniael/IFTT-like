"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const utilities_1 = require("../../../src/utilities");
(0, ava_1.default)('escapes SQL literal value', (t) => {
    t.is((0, utilities_1.escapeLiteralValue)('foo'), '\'foo\'');
    t.is((0, utilities_1.escapeLiteralValue)('foo bar'), '\'foo bar\'');
    t.is((0, utilities_1.escapeLiteralValue)('"foo"'), '\'"foo"\'');
    t.is((0, utilities_1.escapeLiteralValue)('foo\\bar'), 'E\'foo\\\\bar\'');
});
//# sourceMappingURL=escapeLiteralValue.js.map