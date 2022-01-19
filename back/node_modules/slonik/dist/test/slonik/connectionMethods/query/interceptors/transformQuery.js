"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const createSqlTag_1 = require("../../../../../src/factories/createSqlTag");
const createPool_1 = require("../../../../helpers/createPool");
const sql = (0, createSqlTag_1.createSqlTag)();
(0, ava_1.default)('transforms query', async (t) => {
    const pool = (0, createPool_1.createPool)({
        interceptors: [
            {
                transformQuery: (executionContext, query) => {
                    return {
                        ...query,
                        sql: 'SELECT 2',
                    };
                },
            },
        ],
    });
    await pool.query(sql `SELECT 1`);
    t.is(pool.querySpy.firstCall.args[0], 'SELECT 2');
});
//# sourceMappingURL=transformQuery.js.map