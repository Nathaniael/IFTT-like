"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const createSqlTag_1 = require("../../../../src/factories/createSqlTag");
const tokens_1 = require("../../../../src/tokens");
const sql = (0, createSqlTag_1.createSqlTag)();
(0, ava_1.default)('binds an empty array', (t) => {
    const query = sql `SELECT ${sql.array([], 'int4')}`;
    t.deepEqual(query, {
        sql: 'SELECT $1::"int4"[]',
        type: tokens_1.SqlToken,
        values: [
            [],
        ],
    });
});
(0, ava_1.default)('binds an array with multiple values', (t) => {
    const query = sql `SELECT ${sql.array([
        1,
        2,
        3,
    ], 'int4')}`;
    t.deepEqual(query, {
        sql: 'SELECT $1::"int4"[]',
        type: tokens_1.SqlToken,
        values: [
            [
                1,
                2,
                3,
            ],
        ],
    });
});
(0, ava_1.default)('binds an array with bytea values', (t) => {
    const query = sql `SELECT ${sql.array([
        Buffer.from('foo'),
    ], 'bytea')}`;
    t.deepEqual(query, {
        sql: 'SELECT $1::"bytea"[]',
        type: tokens_1.SqlToken,
        values: [
            [
                Buffer.from('foo'),
            ],
        ],
    });
});
(0, ava_1.default)('offsets positional parameter indexes', (t) => {
    const query = sql `SELECT ${1}, ${sql.array([
        1,
        2,
        3,
    ], 'int4')}, ${3}`;
    t.deepEqual(query, {
        sql: 'SELECT $1, $2::"int4"[], $3',
        type: tokens_1.SqlToken,
        values: [
            1,
            [
                1,
                2,
                3,
            ],
            3,
        ],
    });
});
(0, ava_1.default)('binds a SQL token', (t) => {
    const query = sql `SELECT ${sql.array([
        1,
        2,
        3,
    ], sql `int[]`)}`;
    t.deepEqual(query, {
        sql: 'SELECT $1::int[]',
        type: tokens_1.SqlToken,
        values: [
            [
                1,
                2,
                3,
            ],
        ],
    });
});
(0, ava_1.default)('throws if array member is not a primitive value expression', (t) => {
    const error = t.throws(() => {
        sql `SELECT ${sql.array([
            // @ts-expect-error
            () => { },
        ], 'int')}`;
    });
    t.is(error === null || error === void 0 ? void 0 : error.message, 'Invalid array member type. Must be a primitive value expression.');
});
(0, ava_1.default)('throws if memberType is not a string or SqlToken of different type than "SLONIK_TOKEN_SQL"', (t) => {
    const error = t.throws(() => {
        sql `SELECT ${sql.array([
            1,
            2,
            3,
        ], sql.identifier([
            'int',
        ]))}`;
    });
    t.is(error === null || error === void 0 ? void 0 : error.message, 'Unsupported `memberType`. `memberType` must be a string or SqlToken of "SLONIK_TOKEN_SQL" type.');
});
//# sourceMappingURL=array.js.map