"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createErrorWithCode = void 0;
const createErrorWithCode = (code) => {
    const error = new Error('foo');
    // @ts-expect-error
    error.code = code;
    return error;
};
exports.createErrorWithCode = createErrorWithCode;
//# sourceMappingURL=createErrorWithCode.js.map