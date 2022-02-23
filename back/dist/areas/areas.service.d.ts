import { HttpService } from '@nestjs/axios';
import { DatabasePool } from 'slonik';
import { AreaCreationDto } from './areas.dto';
export declare class AreasService {
    private readonly pool;
    private readonly httpService;
    constructor(pool: DatabasePool, httpService: HttpService);
    callReaction(service: string, type: string, data: any): Promise<void>;
    createArea(body: AreaCreationDto): Promise<void>;
}
