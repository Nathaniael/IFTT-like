import { HttpService } from '@nestjs/axios';
import { DatabasePool } from 'slonik';
import { AreaCreationDto } from './areas.dto';
export declare class AreasService {
    private readonly pool;
    private readonly httpService;
    constructor(pool: DatabasePool, httpService: HttpService);
    callReaction(params: string): Promise<void>;
    createArea(userId: string, body: AreaCreationDto): Promise<void>;
}
