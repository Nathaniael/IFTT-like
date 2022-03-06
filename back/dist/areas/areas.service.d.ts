import { HttpService } from '@nestjs/axios';
import { DatabasePool } from 'slonik';
import { ActionsService } from 'src/actions/actions.service';
import { AreaCreationDto } from './areas.dto';
export declare class AreasService {
    private readonly pool;
    private readonly httpService;
    private readonly actionsService;
    constructor(pool: DatabasePool, httpService: HttpService, actionsService: ActionsService);
    callReaction(params: string): Promise<void>;
    checkBodyCreateArea(body: AreaCreationDto): void;
    createArea(userId: string, body: AreaCreationDto): Promise<void>;
    createReaction(serviceName: string, user_id: string, id: number): Promise<void>;
    deleteArea(id: string): Promise<void>;
    getAreaByUser(usrId: string): Promise<readonly import("slonik").QueryResultRow[]>;
}
