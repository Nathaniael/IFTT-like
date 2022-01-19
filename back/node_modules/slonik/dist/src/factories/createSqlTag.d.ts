import type { QueryResultRow, SqlTaggedTemplate } from '../types';
export declare const createSqlTag: <T extends QueryResultRow = QueryResultRow>() => SqlTaggedTemplate<T>;
