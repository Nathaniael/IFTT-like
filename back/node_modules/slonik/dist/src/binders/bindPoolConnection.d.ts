import type { PoolClient as PgPoolClient } from 'pg';
import type { ClientConfiguration, DatabasePoolConnection, Logger } from '../types';
export declare const bindPoolConnection: (parentLog: Logger, connection: PgPoolClient, clientConfiguration: ClientConfiguration) => DatabasePoolConnection;
