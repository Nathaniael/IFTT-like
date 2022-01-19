import type { TestFn } from 'ava';
import type { PoolConfig, Pool as PgPoolType } from 'pg';
declare type TestContextType = {
    dsn: string;
    testDatabaseName: string;
};
export declare const createTestRunner: (PgPool: new (poolConfig: PoolConfig) => PgPoolType, name: string) => {
    test: TestFn<TestContextType>;
};
export declare const createIntegrationTests: (test: TestFn<TestContextType>, PgPool: new () => PgPoolType) => void;
export {};
