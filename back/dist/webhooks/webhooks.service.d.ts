import { ActionsService } from 'src/actions/actions.service';
export declare class WebhooksService {
    private readonly actionService;
    constructor(actionService: ActionsService);
    getActions(): Promise<void>;
}
