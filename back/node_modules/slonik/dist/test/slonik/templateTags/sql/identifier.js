"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const createSqlTag_1 = require("../../../../src/factories/createSqlTag");
const tokens_1 = require("../../../../src/tokens");
const sql = (0, createSqlTag_1.createSqlTag)();
(0, ava_1.default)('creates an object describing a query with inlined identifiers', (t) => {
    const query = sql `SELECT ${'foo'} FROM ${sql.identifier([
        'bar',
    ])}`;
    t.deepEqual(query, {
        sql: 'SELECT $1 FROM "bar"',
        type: tokens_1.SqlToken,
        values: [
            'foo',
        ],
    });
});
(0, ava_1.default)('creates an object describing a query with inlined identifiers (specifier)', (t) => {
    const query = sql `SELECT ${'foo'} FROM ${sql.identifier([
        'bar',
        'baz',
    ])}`;
    t.deepEqual(query, {
        sql: 'SELECT $1 FROM "bar"."baz"',
        type: tokens_1.SqlToken,
        values: [
            'foo',
        ],
    });
});
(0, ava_1.default)('throws if an identifier name array member type is not a string', (t) => {
    const error = t.throws(() => {
        sql `${sql.identifier([
            // @ts-expect-error
            () => { },
        ])}`;
    });
    t.is(error === null || error === void 0 ? void 0 : error.message, 'Identifier name array member type must be a string.');
});
//# sourceMappingURL=identifier.js.map