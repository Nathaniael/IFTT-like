import { AreasService } from 'src/areas/areas.service';
import { WebhooksService } from './webhooks.service';
export declare class WebhooksController {
    private readonly webhooksServices;
    private readonly areasServices;
    constructor(webhooksServices: WebhooksService, areasServices: AreasService);
    actionGithub(req: any, body: any): Promise<void>;
    actionGitlab(body: any): Promise<void>;
    actionArea(body: any): Promise<void>;
}
