import { Body, Controller, Post, Req } from '@nestjs/common';
import { AreasService } from 'src/areas/areas.service';
import { WebhooksService } from './webhooks.service';

@Controller('webhooks')
export class WebhooksController {

    constructor(
        private readonly webhooksServices: WebhooksService,
        private readonly areasServices: AreasService
    ) { }

    @Post('Github')
    async reactionGithub(@Req() req, @Body() body) {
        let params = JSON.stringify({repoId:body.repository.id,secret:req.headers["x-hub-signature"]})
        this.areasServices.callReaction(params)
    }
}
