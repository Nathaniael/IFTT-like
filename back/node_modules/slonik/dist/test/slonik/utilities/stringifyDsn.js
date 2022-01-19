"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const utilities_1 = require("../../../src/utilities");
const dsns = [
    'postgresql://',
    'postgresql://localhost',
    'postgresql://localhost:5432',
    'postgresql://localhost/foo',
    'postgresql://foo@localhost',
    'postgresql://foo:bar@localhost',
    'postgresql://foo@localhost/bar',
    'postgresql://foo@localhost/bar?application_name=foo',
    'postgresql://foo@localhost/bar?sslmode=no-verify',
    'postgresql://fo%2Fo:b%2Far@localhost/ba%2Fz',
];
for (const dsn of dsns) {
    (0, ava_1.default)('creates DSN ' + dsn, (t) => {
        t.is((0, utilities_1.stringifyDsn)((0, utilities_1.parseDsn)(dsn)), dsn);
    });
}
//# sourceMappingURL=stringifyDsn.js.map