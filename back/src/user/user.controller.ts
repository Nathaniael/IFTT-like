import { Body, Controller, Get, Post, UseGuards, Res } from '@nestjs/common';
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

    @Post('addOAuth')
    // @UseGuards(AuthGuard('jwt'))
    async addOauthToUsr(@User() usr: UserAuth, @Body() body: OauthCreationDto) {
        return this.usersService.addOauthToUsr(usr, body)
    }

    @Get('profile')
    // @UseGuards(AuthGuard('jwt'))
    async getUserProfile(@User() usr: UserAuth, @Res() res) {
        res.status(200).json({
            username: usr.username
        })
    }
}
