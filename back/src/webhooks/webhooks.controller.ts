import { Body, Controller, Post } from '@nestjs/common';
import { AreasService } from 'src/areas/areas.service';
import { GithubDto } from './webhooks.dto';
import { WebhooksService } from './webhooks.service';

@Controller('webhooks')
export class WebhooksController {

    constructor(
        private readonly webhooksServices: WebhooksService,
        private readonly areasServices: AreasService
    ) { }

    @Post('github')
    async reactionGithub(@Body() body) {
        const type = this.webhooksServices.getGithubActionType(body);
        const data = this.webhooksServices.getGithubActionData(body);
        this.areasServices.callReaction('github', type, data)
    }
}
