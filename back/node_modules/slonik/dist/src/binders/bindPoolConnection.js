"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bindPoolConnection = void 0;
const assertions_1 = require("../assertions");
const connectionMethods_1 = require("../connectionMethods");
const bindPoolConnection = (parentLog, connection, clientConfiguration) => {
    return {
        any: (query) => {
            (0, assertions_1.assertSqlSqlToken)(query);
            return (0, connectionMethods_1.any)(parentLog, connection, clientConfiguration, query.sql, query.values);
        },
        anyFirst: (query) => {
            (0, assertions_1.assertSqlSqlToken)(query);
            return (0, connectionMethods_1.anyFirst)(parentLog, connection, clientConfiguration, query.sql, query.values);
        },
        copyFromBinary: (query, values, columnTypes) => {
            (0, assertions_1.assertSqlSqlToken)(query);
            return (0, connectionMethods_1.copyFromBinary)(parentLog, connection, clientConfiguration, query.sql, query.values, values, columnTypes);
        },
        exists: (query) => {
            (0, assertions_1.assertSqlSqlToken)(query);
            return (0, connectionMethods_1.exists)(parentLog, connection, clientConfiguration, query.sql, query.values);
        },
        many: (query) => {
            (0, assertions_1.assertSqlSqlToken)(query);
            return (0, connectionMethods_1.many)(parentLog, connection, clientConfiguration, query.sql, query.values);
        },
        manyFirst: (query) => {
            (0, assertions_1.assertSqlSqlToken)(query);
            return (0, connectionMethods_1.manyFirst)(parentLog, connection, clientConfiguration, query.sql, query.values);
        },
        maybeOne: (query) => {
            (0, assertions_1.assertSqlSqlToken)(query);
            return (0, connectionMethods_1.maybeOne)(parentLog, connection, clientConfiguration, query.sql, query.values);
        },
        maybeOneFirst: (query) => {
            (0, assertions_1.assertSqlSqlToken)(query);
            return (0, connectionMethods_1.maybeOneFirst)(parentLog, connection, clientConfiguration, query.sql, query.values);
        },
        one: (query) => {
            (0, assertions_1.assertSqlSqlToken)(query);
            return (0, connectionMethods_1.one)(parentLog, connection, clientConfiguration, query.sql, query.values);
        },
        oneFirst: (query) => {
            (0, assertions_1.assertSqlSqlToken)(query);
            return (0, connectionMethods_1.oneFirst)(parentLog, connection, clientConfiguration, query.sql, query.values);
        },
        query: (query) => {
            (0, assertions_1.assertSqlSqlToken)(query);
            return (0, connectionMethods_1.query)(parentLog, connection, clientConfiguration, query.sql, query.values);
        },
        stream: (query, streamHandler, config) => {
            (0, assertions_1.assertSqlSqlToken)(query);
            return (0, connectionMethods_1.stream)(parentLog, connection, clientConfiguration, query.sql, query.values, streamHandler, undefined, config);
        },
        transaction: (handler, transactionRetryLimit) => {
            return (0, connectionMethods_1.transaction)(parentLog, connection, clientConfiguration, handler, transactionRetryLimit);
        },
    };
};
exports.bindPoolConnection = bindPoolConnection;
//# sourceMappingURL=bindPoolConnection.js.map