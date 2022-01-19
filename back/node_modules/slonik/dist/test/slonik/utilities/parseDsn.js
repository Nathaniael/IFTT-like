"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const utilities_1 = require("../../../src/utilities");
const testParse = ava_1.default.macro((t, connectionOptions) => {
    t.deepEqual((0, utilities_1.parseDsn)(t.title), connectionOptions);
});
(0, ava_1.default)('postgresql://', testParse, {});
(0, ava_1.default)('postgresql://localhost', testParse, {
    host: 'localhost',
});
(0, ava_1.default)('postgresql://localhost:5432', testParse, {
    host: 'localhost',
    port: 5432,
});
(0, ava_1.default)('postgresql://localhost/foo', testParse, {
    databaseName: 'foo',
    host: 'localhost',
});
(0, ava_1.default)('postgresql://foo@localhost', testParse, {
    host: 'localhost',
    username: 'foo',
});
(0, ava_1.default)('postgresql://foo:bar@localhost', testParse, {
    host: 'localhost',
    password: 'bar',
    username: 'foo',
});
(0, ava_1.default)('postgresql://localhost/?&application_name=baz', testParse, {
    applicationName: 'baz',
    host: 'localhost',
});
(0, ava_1.default)('postgresql://fo%2Fo:b%2Far@localhost/ba%2Fz', testParse, {
    databaseName: 'ba/z',
    host: 'localhost',
    password: 'b/ar',
    username: 'fo/o',
});
//# sourceMappingURL=parseDsn.js.map