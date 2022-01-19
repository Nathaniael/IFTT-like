"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bindPool = void 0;
const assertions_1 = require("../assertions");
const connectionMethods_1 = require("../connectionMethods");
const factories_1 = require("../factories");
const state_1 = require("../state");
const bindPool = (parentLog, pool, clientConfiguration) => {
    return {
        any: (query) => {
            return (0, factories_1.createConnection)(parentLog, pool, clientConfiguration, 'IMPLICIT_QUERY', (connectionLog, connection, boundConnection) => {
                return boundConnection.any(query);
            }, (newPool) => {
                return newPool.any(query);
            }, query);
        },
        anyFirst: (query) => {
            return (0, factories_1.createConnection)(parentLog, pool, clientConfiguration, 'IMPLICIT_QUERY', (connectionLog, connection, boundConnection) => {
                return boundConnection.anyFirst(query);
            }, (newPool) => {
                return newPool.anyFirst(query);
            }, query);
        },
        configuration: clientConfiguration,
        connect: (connectionHandler) => {
            return (0, factories_1.createConnection)(parentLog, pool, clientConfiguration, 'EXPLICIT', (connectionLog, connection, boundConnection) => {
                return connectionHandler(boundConnection);
            }, (newPool) => {
                return newPool.connect(connectionHandler);
            });
        },
        copyFromBinary: (copyQuery, values, columnTypes) => {
            (0, assertions_1.assertSqlSqlToken)(copyQuery);
            return (0, factories_1.createConnection)(parentLog, pool, clientConfiguration, 'IMPLICIT_QUERY', (connectionLog, connection, boundConnection) => {
                return boundConnection.copyFromBinary(copyQuery, values, columnTypes);
            }, (newPool) => {
                return newPool.copyFromBinary(copyQuery, values, columnTypes);
            });
        },
        end: async () => {
            const poolState = (0, state_1.getPoolState)(pool);
            const terminateIdleClients = () => {
                const activeConnectionCount = pool.totalCount - pool.idleCount;
                if (activeConnectionCount === 0) {
                    for (const client of pool._clients) {
                        pool._remove(client);
                    }
                }
            };
            poolState.ended = true;
            await new Promise((resolve) => {
                terminateIdleClients();
                pool.on('remove', () => {
                    if (pool.totalCount === 0) {
                        resolve(undefined);
                    }
                });
                if (pool.totalCount === 0) {
                    resolve(undefined);
                }
            });
        },
        exists: (query) => {
            return (0, factories_1.createConnection)(parentLog, pool, clientConfiguration, 'IMPLICIT_QUERY', (connectionLog, connection, boundConnection) => {
                return boundConnection.exists(query);
            }, (newPool) => {
                return newPool.exists(query);
            }, query);
        },
        getPoolState: () => {
            const poolState = (0, state_1.getPoolState)(pool);
            return {
                activeConnectionCount: pool.totalCount - pool.idleCount,
                ended: poolState.ended,
                idleConnectionCount: pool.idleCount,
                waitingClientCount: pool.waitingCount,
            };
        },
        many: (query) => {
            return (0, factories_1.createConnection)(parentLog, pool, clientConfiguration, 'IMPLICIT_QUERY', (connectionLog, connection, boundConnection) => {
                return boundConnection.many(query);
            }, (newPool) => {
                return newPool.many(query);
            }, query);
        },
        manyFirst: (query) => {
            return (0, factories_1.createConnection)(parentLog, pool, clientConfiguration, 'IMPLICIT_QUERY', (connectionLog, connection, boundConnection) => {
                return boundConnection.manyFirst(query);
            }, (newPool) => {
                return newPool.manyFirst(query);
            }, query);
        },
        maybeOne: (query) => {
            return (0, factories_1.createConnection)(parentLog, pool, clientConfiguration, 'IMPLICIT_QUERY', (connectionLog, connection, boundConnection) => {
                return boundConnection.maybeOne(query);
            }, (newPool) => {
                return newPool.maybeOne(query);
            }, query);
        },
        maybeOneFirst: (query) => {
            return (0, factories_1.createConnection)(parentLog, pool, clientConfiguration, 'IMPLICIT_QUERY', (connectionLog, connection, boundConnection) => {
                return boundConnection.maybeOneFirst(query);
            }, (newPool) => {
                return newPool.maybeOneFirst(query);
            }, query);
        },
        one: (query) => {
            return (0, factories_1.createConnection)(parentLog, pool, clientConfiguration, 'IMPLICIT_QUERY', (connectionLog, connection, boundConnection) => {
                return boundConnection.one(query);
            }, (newPool) => {
                return newPool.one(query);
            }, query);
        },
        oneFirst: (query) => {
            return (0, factories_1.createConnection)(parentLog, pool, clientConfiguration, 'IMPLICIT_QUERY', (connectionLog, connection, boundConnection) => {
                return boundConnection.oneFirst(query);
            }, (newPool) => {
                return newPool.oneFirst(query);
            }, query);
        },
        query: (query) => {
            return (0, factories_1.createConnection)(parentLog, pool, clientConfiguration, 'IMPLICIT_QUERY', (connectionLog, connection, boundConnection) => {
                return boundConnection.query(query);
            }, (newPool) => {
                return newPool.query(query);
            }, query);
        },
        stream: (streamQuery, streamHandler, config) => {
            (0, assertions_1.assertSqlSqlToken)(streamQuery);
            return (0, factories_1.createConnection)(parentLog, pool, clientConfiguration, 'IMPLICIT_QUERY', (connectionLog, connection, boundConnection) => {
                return boundConnection.stream(streamQuery, streamHandler, config);
            }, (newPool) => {
                return newPool.stream(streamQuery, streamHandler, config);
            }, streamQuery);
        },
        transaction: async (transactionHandler, transactionRetryLimit) => {
            return await (0, factories_1.createConnection)(parentLog, pool, clientConfiguration, 'IMPLICIT_TRANSACTION', (connectionLog, connection) => {
                return (0, connectionMethods_1.transaction)(connectionLog, connection, clientConfiguration, transactionHandler, transactionRetryLimit);
            }, (newPool) => {
                return newPool.transaction(transactionHandler);
            });
        },
    };
};
exports.bindPool = bindPool;
//# sourceMappingURL=bindPool.js.map