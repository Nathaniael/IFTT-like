import { DatabasePool } from 'slonik';
export declare class ServicesService {
    private readonly pool;
    constructor(pool: DatabasePool);
    getServices(): Promise<any[]>;
    getActionsByServiceId(id: number): Promise<readonly import("slonik").QueryResultRow[]>;
    getReactionsByServiceId(id: number): Promise<readonly import("slonik").QueryResultRow[]>;
}
