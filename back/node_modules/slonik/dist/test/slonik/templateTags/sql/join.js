"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const createSqlTag_1 = require("../../../../src/factories/createSqlTag");
const tokens_1 = require("../../../../src/tokens");
const sql = (0, createSqlTag_1.createSqlTag)();
(0, ava_1.default)('creates a list of values', (t) => {
    const query = sql `SELECT (${sql.join([
        1,
        2,
        3,
    ], sql `, `)})`;
    t.deepEqual(query, {
        sql: 'SELECT ($1, $2, $3)',
        type: tokens_1.SqlToken,
        values: [
            1,
            2,
            3,
        ],
    });
});
(0, ava_1.default)('creates a list of values using glue', (t) => {
    const query = sql `SELECT ${sql.join([
        sql `TRUE`,
        sql `TRUE`,
    ], sql ` AND `)}`;
    t.deepEqual(query, {
        sql: 'SELECT TRUE AND TRUE',
        type: tokens_1.SqlToken,
        values: [],
    });
});
(0, ava_1.default)('interpolates SQL tokens', (t) => {
    const query = sql `SELECT (${sql.join([
        1,
        sql `foo`,
        3,
    ], sql `, `)})`;
    t.deepEqual(query, {
        sql: 'SELECT ($1, foo, $2)',
        type: tokens_1.SqlToken,
        values: [
            1,
            3,
        ],
    });
});
(0, ava_1.default)('interpolates SQL tokens with bound values', (t) => {
    const query = sql `SELECT ${sql.join([
        1,
        sql `to_timestamp(${2}), ${3}`,
        4,
    ], sql `, `)}`;
    t.deepEqual(query, {
        sql: 'SELECT $1, to_timestamp($2), $3, $4',
        type: tokens_1.SqlToken,
        values: [
            1,
            2,
            3,
            4,
        ],
    });
});
(0, ava_1.default)('offsets positional parameter indexes', (t) => {
    const query = sql `SELECT ${1}, ${sql.join([
        1,
        sql `to_timestamp(${2}), ${3}`,
        4,
    ], sql `, `)}, ${3}`;
    t.deepEqual(query, {
        sql: 'SELECT $1, $2, to_timestamp($3), $4, $5, $6',
        type: tokens_1.SqlToken,
        values: [
            1,
            1,
            2,
            3,
            4,
            3,
        ],
    });
});
(0, ava_1.default)('nests expressions', (t) => {
    const query = sql `SELECT ${sql.join([
        sql `(${sql.join([
            1,
            2,
        ], sql `, `)})`,
        sql `(${sql.join([
            3,
            4,
        ], sql `, `)})`,
    ], sql `, `)}`;
    t.deepEqual(query, {
        sql: 'SELECT ($1, $2), ($3, $4)',
        type: tokens_1.SqlToken,
        values: [
            1,
            2,
            3,
            4,
        ],
    });
});
(0, ava_1.default)('binary join expressions', (t) => {
    const data = Buffer.from('1f', 'hex');
    const query = sql `SELECT (${sql.join([
        'a',
        sql.binary(data),
    ], sql `, `)})`;
    t.deepEqual(query, {
        sql: 'SELECT ($1, $2)',
        type: tokens_1.SqlToken,
        values: [
            'a',
            data,
        ],
    });
});
(0, ava_1.default)('throws is member is not a SQL token or a primitive value expression', (t) => {
    const error = t.throws(() => {
        sql `${sql.join([
            // @ts-expect-error
            () => { },
        ], sql `, `)}`;
    });
    t.is(error === null || error === void 0 ? void 0 : error.message, 'Invalid list member type. Must be a SQL token or a primitive value expression.');
});
//# sourceMappingURL=join.js.map