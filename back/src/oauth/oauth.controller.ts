import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InjectPool } from 'nestjs-slonik';
import { DatabasePool, sql } from 'slonik'
import { UserAuth } from 'src/auth/auth.controller';
import { User } from 'src/user/user.decorator';
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
    @UseGuards(AuthGuard('jwt'))
    async getToken(@User() user: UserAuth, @Body() body: TokenCreationDto): Promise<string> {
        // const token = await this.oauthService.getToken(body)
        await this.oauthService.storeToken(body.token, user.userId)
        return "Token well added to DB"
    }

}
