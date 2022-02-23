import { AreaCreationDto } from './areas.dto';
import { AreasService } from './areas.service';
export declare class AreasController {
    private readonly areasServices;
    constructor(areasServices: AreasService);
    createArea(body: AreaCreationDto): Promise<void>;
}
