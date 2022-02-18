import { Body, Controller, Get, Post } from '@nestjs/common';
import { InjectPool } from 'nestjs-slonik';
import { DatabasePool, sql } from 'slonik'
import { TokenCreationDto } from './oauth.dto';
import { OauthService } from './oauth.service';

@Controller('oauth')
export class OauthController {

    constructor(
        private readonly oauthService: OauthService
    ) { }

    @Get('')
    async getAuthLink(@Body() body: { name: string }): Promise<string> {
        const service = await this.oauthService.getLink(body.name)
        return service
    }

    @Post('')
    async getToken(@Body() body: TokenCreationDto): Promise<string> {
        return this.oauthService.getToken(body)
    }

}
