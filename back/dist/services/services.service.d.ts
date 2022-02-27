import { DatabasePool } from 'slonik';
export declare class ServicesService {
    private readonly pool;
    constructor(pool: DatabasePool);
    getServices(): Promise<readonly import("slonik").QueryResultRow[]>;
    getActionsByServiceId(id: number): Promise<readonly import("slonik").QueryResultRow[]>;
    getReactionsByServiceId(id: number): Promise<readonly import("slonik").QueryResultRow[]>;
}
