import { Body, Controller, Post } from '@nestjs/common';
import { GithubDto } from './webhooks.dto';

@Controller('webhooks')
export class WebhooksController {
    @Post('github') handleRequest (@Body() body: GithubDto){
        console.log(body.repository.full_name)
    }
}
