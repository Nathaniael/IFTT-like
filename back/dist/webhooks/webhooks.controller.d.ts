import { AreasService } from 'src/areas/areas.service';
import { WebhooksService } from './webhooks.service';
export declare class WebhooksController {
    private readonly webhooksServices;
    private readonly areasServices;
    constructor(webhooksServices: WebhooksService, areasServices: AreasService);
    reactionGithub(req: any, body: any): Promise<void>;
}
