"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertSqlSqlToken = void 0;
const assertSqlSqlToken = (subject) => {
    if (typeof subject !== 'object' || subject === null || subject.type !== 'SLONIK_TOKEN_SQL') {
        throw new TypeError('Query must be constructed using `sql` tagged template literal.');
    }
};
exports.assertSqlSqlToken = assertSqlSqlToken;
//# sourceMappingURL=assertions.js.map