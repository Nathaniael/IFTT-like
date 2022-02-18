import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserAuth } from 'src/auth/auth.controller';
import { User } from './user.decorator';
import { OauthCreationDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly usersService: UserService
    ) { }

    @Get('hello')
    @UseGuards(AuthGuard('jwt'))
    async test(@User() user: UserAuth) {
        console.log(user)
    }

    @Post('addOAuth')
    @UseGuards(AuthGuard('jwt'))
    async addOauthToUsr(@User() usr: UserAuth, @Body() body: OauthCreationDto) {
        return this.usersService.addOauthToUsr(usr, body)
    }
}
