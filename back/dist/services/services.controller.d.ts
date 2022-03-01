import { ServicesService } from './services.service';
import { UserAuth } from 'src/auth/auth.controller';
export declare class ServicesController {
    private readonly servicesService;
    constructor(servicesService: ServicesService);
    getServices(usr: UserAuth, req: any): Promise<any[]>;
    getActionsByServiceId(usr: UserAuth, body: {
        id: number;
    }): Promise<readonly import("slonik").QueryResultRow[]>;
    getReactionsByServiceId(usr: UserAuth, body: {
        id: number;
    }): Promise<readonly import("slonik").QueryResultRow[]>;
}
