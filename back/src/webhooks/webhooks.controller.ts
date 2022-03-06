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
    async actionGithub(@Req() req, @Body() body) {
        let params = JSON.stringify({url:body.repository.html_url,secret:req.headers["x-hub-signature"]})
        this.areasServices.callReaction(params)
    }

    @Post('Gitlab')
    async actionGitlab(@Req() req, @Body() body) {
        const params = JSON.stringify({
            project_id: body.project_id,
        })
        this.areasServices.callReaction(params)
    }
}
