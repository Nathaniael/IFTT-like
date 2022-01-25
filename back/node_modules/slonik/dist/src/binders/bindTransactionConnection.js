"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bindTransactionConnection = void 0;
const assertions_1 = require("../assertions");
const connectionMethods_1 = require("../connectionMethods");
const state_1 = require("../state");
const bindTransactionConnection = (parentLog, connection, clientConfiguration, transactionDepth) => {
    const poolClientState = (0, state_1.getPoolClientState)(connection);
    const assertTransactionDepth = () => {
        if (transactionDepth !== poolClientState.transactionDepth) {
            throw new Error('Cannot run a query using parent transaction.');
        }
    };
    return {
        any: (query) => {
            (0, assertions_1.assertSqlSqlToken)(query);
            assertTransactionDepth();
            return (0, connectionMethods_1.any)(parentLog, connection, clientConfiguration, query.sql, query.values);
        },
        anyFirst: (query) => {
            (0, assertions_1.assertSqlSqlToken)(query);
            assertTransactionDepth();
            return (0, connectionMethods_1.anyFirst)(parentLog, connection, clientConfiguration, query.sql, query.values);
        },
        exists: (query) => {
            (0, assertions_1.assertSqlSqlToken)(query);
            assertTransactionDepth();
            return (0, connectionMethods_1.exists)(parentLog, connection, clientConfiguration, query.sql, query.values);
        },
        many: (query) => {
            (0, assertions_1.assertSqlSqlToken)(query);
            assertTransactionDepth();
            return (0, connectionMethods_1.many)(parentLog, connection, clientConfiguration, query.sql, query.values);
        },
        manyFirst: (query) => {
            (0, assertions_1.assertSqlSqlToken)(query);
            assertTransactionDepth();
            return (0, connectionMethods_1.manyFirst)(parentLog, connection, clientConfiguration, query.sql, query.values);
        },
        maybeOne: (query) => {
            (0, assertions_1.assertSqlSqlToken)(query);
            assertTransactionDepth();
            return (0, connectionMethods_1.maybeOne)(parentLog, connection, clientConfiguration, query.sql, query.values);
        },
        maybeOneFirst: (query) => {
            (0, assertions_1.assertSqlSqlToken)(query);
            assertTransactionDepth();
            return (0, connectionMethods_1.maybeOneFirst)(parentLog, connection, clientConfiguration, query.sql, query.values);
        },
        one: (query) => {
            (0, assertions_1.assertSqlSqlToken)(query);
            assertTransactionDepth();
            return (0, connectionMethods_1.one)(parentLog, connection, clientConfiguration, query.sql, query.values);
        },
        oneFirst: (query) => {
            (0, assertions_1.assertSqlSqlToken)(query);
            assertTransactionDepth();
            return (0, connectionMethods_1.oneFirst)(parentLog, connection, clientConfiguration, query.sql, query.values);
        },
        query: (query) => {
            (0, assertions_1.assertSqlSqlToken)(query);
            assertTransactionDepth();
            return (0, connectionMethods_1.query)(parentLog, connection, clientConfiguration, query.sql, query.values);
        },
        stream: (query, streamHandler) => {
            (0, assertions_1.assertSqlSqlToken)(query);
            assertTransactionDepth();
            return (0, connectionMethods_1.stream)(parentLog, connection, clientConfiguration, query.sql, query.values, streamHandler);
        },
        transaction: (handler, transactionRetryLimit) => {
            assertTransactionDepth();
            return (0, connectionMethods_1.nestedTransaction)(parentLog, connection, clientConfiguration, handler, transactionDepth, transactionRetryLimit);
        },
    };
};
exports.bindTransactionConnection = bindTransactionConnection;
//# sourceMappingURL=bindTransactionConnection.js.map