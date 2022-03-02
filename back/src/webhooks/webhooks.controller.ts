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
        this.areasServices.callReaction(params, "")
    }

    @Post('Gitlab')
    async reactionGitlab(@Req() req, @Body() body) {
        const type = JSON.stringify({
            event_name: body.event_name,
            service: "Gitlab"
        })
        const params = JSON.stringify({
            project_id: body.project_id
        })
        this.areasServices.callReaction(params, type)
    }
}
