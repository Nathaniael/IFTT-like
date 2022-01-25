import type { Pool as PgPool } from 'pg';
import type { ClientConfiguration, DatabasePool, Logger } from '../types';
export declare const bindPool: (parentLog: Logger, pool: PgPool, clientConfiguration: ClientConfiguration) => DatabasePool;
