import { AreaCreationDto } from './areas.dto';
import { AreasService } from './areas.service';
export declare class AreasController {
    private readonly areasServices;
    constructor(areasServices: AreasService);
    createArea(user: any, body: AreaCreationDto, res: any): Promise<void>;
    deleteArea(user: any, body: any, res: any): Promise<void>;
    getAreasByUser(user: any, body: any, res: any): Promise<void>;
}
