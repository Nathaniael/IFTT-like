"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClientConfiguration = void 0;
const createClientConfiguration = () => {
    return {
        captureStackTrace: true,
        connectionRetryLimit: 3,
        connectionTimeout: 5000,
        idleInTransactionSessionTimeout: 60000,
        idleTimeout: 5000,
        interceptors: [],
        maximumPoolSize: 10,
        queryRetryLimit: 5,
        statementTimeout: 60000,
        transactionRetryLimit: 5,
        typeParsers: [],
    };
};
exports.createClientConfiguration = createClientConfiguration;
//# sourceMappingURL=createClientConfiguration.js.map