import { AreaCreationDto, AreaId } from './areas.dto';
import { AreasService } from './areas.service';
import { UserAuth } from 'src/auth/auth.controller';
import { HttpService } from '@nestjs/axios';
import { UserAreas } from 'src/user/user.areas';
export declare class AreasController {
    private readonly areasServices;
    private readonly httpService;
    private readonly usersArea;
    constructor(areasServices: AreasService, httpService: HttpService, usersArea: UserAreas);
    createArea(user: any, body: AreaCreationDto, res: any): Promise<void>;
    deleteArea(user: UserAuth, body: AreaId, res: any): Promise<void>;
    getAreasByUser(user: any, body: any, res: any): Promise<void>;
}
