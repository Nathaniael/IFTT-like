import type { Pool as PgPool, PoolClient as PgPoolClient } from 'pg';
import type { MaybePromise, ClientConfiguration, Connection, DatabasePool, DatabasePoolConnection, Logger, TaggedTemplateLiteralInvocation } from '../types';
declare type ConnectionHandlerType = (connectionLog: Logger, connection: PgPoolClient, boundConnection: DatabasePoolConnection, clientConfiguration: ClientConfiguration) => MaybePromise<any>;
declare type PoolHandlerType = (pool: DatabasePool) => Promise<unknown>;
export declare const createConnection: (parentLog: Logger, pool: PgPool, clientConfiguration: ClientConfiguration, connectionType: Connection, connectionHandler: ConnectionHandlerType, poolHandler: PoolHandlerType, query?: TaggedTemplateLiteralInvocation | null) => Promise<any>;
export {};
