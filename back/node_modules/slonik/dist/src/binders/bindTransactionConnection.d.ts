import type { PoolClient as PgPoolClient } from 'pg';
import type { ClientConfiguration, DatabaseTransactionConnection, Logger } from '../types';
export declare const bindTransactionConnection: (parentLog: Logger, connection: PgPoolClient, clientConfiguration: ClientConfiguration, transactionDepth: number) => DatabaseTransactionConnection;
