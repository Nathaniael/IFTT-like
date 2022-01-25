"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const src_1 = require("../../src");
(0, ava_1.default)('IntegrityConstraintViolationError default message', (t) => {
    t.is(new src_1.IntegrityConstraintViolationError(new Error('original error message'), 'test-constraint').message, 'Query violates an integrity constraint. original error message');
});
(0, ava_1.default)('StatementCancelledError default message', (t) => {
    t.is(new src_1.StatementCancelledError(new Error('original error message')).message, 'Statement has been cancelled. original error message');
});
//# sourceMappingURL=errors.js.map