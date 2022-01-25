"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const roarr_1 = require("roarr");
const createSqlTag_1 = require("../../../../src/factories/createSqlTag");
const tokens_1 = require("../../../../src/tokens");
const test = ava_1.default;
const sql = (0, createSqlTag_1.createSqlTag)();
test.beforeEach((t) => {
    t.context.logs = [];
    roarr_1.ROARR.write = (message) => {
        t.context.logs.push(JSON.parse(message));
    };
});
test('creates an object describing a query', (t) => {
    const query = sql `SELECT 1`;
    t.deepEqual(query, {
        sql: 'SELECT 1',
        type: tokens_1.SqlToken,
        values: [],
    });
});
test('creates an object describing query value bindings', (t) => {
    const query = sql `SELECT ${'foo'}`;
    t.deepEqual(query, {
        sql: 'SELECT $1',
        type: tokens_1.SqlToken,
        values: [
            'foo',
        ],
    });
});
test('creates an object describing query value bindings (multiple)', (t) => {
    const query = sql `SELECT ${'foo'}, ${'bar'}`;
    t.deepEqual(query, {
        sql: 'SELECT $1, $2',
        type: tokens_1.SqlToken,
        values: [
            'foo',
            'bar',
        ],
    });
});
test('nests sql templates', (t) => {
    const query0 = sql `SELECT ${'foo'} FROM bar`;
    const query1 = sql `SELECT ${'baz'} FROM (${query0})`;
    t.deepEqual(query1, {
        sql: 'SELECT $1 FROM (SELECT $2 FROM bar)',
        type: tokens_1.SqlToken,
        values: [
            'baz',
            'foo',
        ],
    });
});
test('throws if bound an undefined value', (t) => {
    const error = t.throws(() => {
        // @ts-expect-error
        sql `SELECT ${undefined}`;
    });
    t.is(error === null || error === void 0 ? void 0 : error.message, 'SQL tag cannot be bound an undefined value.');
});
test.serial.skip('logs all bound values if one is undefined', (t) => {
    t.throws(() => {
        // @ts-expect-error
        sql `SELECT ${undefined}`;
    });
    const targetMessage = t.context.logs.find((message) => {
        return message.message === 'bound values';
    });
    t.truthy(targetMessage);
    t.deepEqual(targetMessage.context.parts, [
        'SELECT ',
        '',
    ]);
});
test('the sql property is immutable', (t) => {
    const query = sql `SELECT 1`;
    t.throws(() => {
        // @ts-expect-error
        query.sql = 'SELECT 2';
    });
});
//# sourceMappingURL=sql.js.map