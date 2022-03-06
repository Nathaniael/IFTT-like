import { DatabasePool } from 'slonik';
import { AreasService } from 'src/areas/areas.service';
import { AorREA } from 'src/queries/queries';
export declare class UserAreas {
    private readonly pool;
    private readonly areaService;
    constructor(pool: DatabasePool, areaService: AreasService);
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
    AreaNumber(userId: string): Promise<void>;
}
