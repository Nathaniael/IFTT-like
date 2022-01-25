"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const createPool_1 = require("../../../src/factories/createPool");
(0, ava_1.default)('pools can be extended', (t) => {
    const prodPool = (0, createPool_1.createPool)('', {
        idleInTransactionSessionTimeout: 'DISABLE_TIMEOUT',
        idleTimeout: 5000,
    });
    const testPool = (0, createPool_1.createPool)('', {
        ...prodPool.configuration,
        idleTimeout: 1000,
    });
    t.is(prodPool.configuration.idleInTransactionSessionTimeout, 'DISABLE_TIMEOUT');
    t.is(testPool.configuration.idleInTransactionSessionTimeout, 'DISABLE_TIMEOUT');
    t.is(prodPool.configuration.idleTimeout, 5000);
    t.is(testPool.configuration.idleTimeout, 1000);
});
//# sourceMappingURL=createPool.js.map