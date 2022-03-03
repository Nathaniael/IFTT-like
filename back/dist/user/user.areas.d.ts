import { DatabasePool } from 'slonik';
import { AorREA } from 'src/queries/queries';
export declare class UserAreas {
    private readonly pool;
    constructor(pool: DatabasePool);
    getActionOrReactionInfos(area: any, aor: AorREA): Promise<{
        name: any;
        description: any;
        params: any;
        service: {
            name: any;
            logo: any;
        };
    }>;
    getAreas(userId: string): Promise<any[]>;
}
