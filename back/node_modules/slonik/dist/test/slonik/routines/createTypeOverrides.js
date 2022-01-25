"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const createTypeOverrides_1 = require("../../../src/routines/createTypeOverrides");
(0, ava_1.default)('uses typname to retrieve pg_type oid', async (t) => {
    const connection = {
        query: () => {
            return {
                rows: [
                    {
                        oid: 'foo',
                        typarray: 'bar',
                        typname: 'int8',
                    },
                ],
            };
        },
    };
    const typeParser = {
        name: 'int8',
        parse: () => {
            return null;
        },
    };
    const typeOverrides = await (0, createTypeOverrides_1.createTypeOverrides)(connection, [
        typeParser,
    ]);
    t.is(typeof typeOverrides.text.foo, 'function');
    t.is(typeof typeOverrides.text.bar, 'function');
});
(0, ava_1.default)('throws an error if type cannot be found', async (t) => {
    const connection = {
        query: () => {
            return {
                rows: [],
            };
        },
    };
    const typeParser = {
        name: 'int8',
        parse: () => {
            return null;
        },
    };
    const error = await t.throwsAsync((0, createTypeOverrides_1.createTypeOverrides)(connection, [
        typeParser,
    ]));
    t.is(error === null || error === void 0 ? void 0 : error.message, 'Database type "int8" not found.');
});
//# sourceMappingURL=createTypeOverrides.js.map