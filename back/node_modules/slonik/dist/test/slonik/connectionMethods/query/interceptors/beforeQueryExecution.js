"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const createSqlTag_1 = require("../../../../../src/factories/createSqlTag");
const createPool_1 = require("../../../../helpers/createPool");
const sql = (0, createSqlTag_1.createSqlTag)();
(0, ava_1.default)('short-circuits the query execution', async (t) => {
    const pool = (0, createPool_1.createPool)({
        interceptors: [
            {
                beforeQueryExecution: () => {
                    return {
                        command: 'SELECT',
                        fields: [],
                        notices: [],
                        rowCount: 1,
                        rows: [
                            {
                                foo: 2,
                            },
                        ],
                    };
                },
            },
        ],
    });
    pool.querySpy.returns({
        rows: [
            {
                foo: 1,
            },
        ],
    });
    const result = await pool.query(sql `SELECT 1`);
    t.deepEqual(result, {
        command: 'SELECT',
        fields: [],
        notices: [],
        rowCount: 1,
        rows: [
            {
                foo: 2,
            },
        ],
    });
});
(0, ava_1.default)('executes query if "beforeQuery" does not return results', async (t) => {
    const pool = (0, createPool_1.createPool)({
        interceptors: [
            {
                beforeQueryExecution: () => {
                    return null;
                },
            },
        ],
    });
    pool.querySpy.returns({
        command: 'SELECT',
        fields: [],
        notices: [],
        rowCount: 1,
        rows: [
            {
                foo: 1,
            },
        ],
    });
    const result = await pool.query(sql `SELECT 1`);
    t.deepEqual(result, {
        command: 'SELECT',
        fields: [],
        notices: [],
        rowCount: 1,
        rows: [
            {
                foo: 1,
            },
        ],
    });
});
//# sourceMappingURL=beforeQueryExecution.js.map