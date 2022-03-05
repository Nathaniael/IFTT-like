import { Body, Controller, Get, Post, UseGuards, Res, BadRequestException, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserAuth } from 'src/auth/auth.controller';
import { User } from './user.decorator';
import { OauthCreationDto, Username } from './user.dto';
import { UserService } from './user.service';
import { UserAreas } from './user.areas';

@Controller('user')
export class UserController {
    constructor(
        private readonly usersService: UserService,
        private readonly userAreas: UserAreas
    ) { }

    @Post('addOAuth')
    @UseGuards(AuthGuard('jwt'))
    async addOauthToUsr(@User() usr: UserAuth, @Body() body: OauthCreationDto) {
        return this.usersService.addOauthToUsr(usr, body)
    }

    @Post('username')
    @UseGuards(AuthGuard('jwt'))
    async changeUsername(@User() usr: UserAuth, @Body() body: Username) {
        return this.usersService.changeUsername(usr.userId, body.username)
    }

    @Get('profile')
    @UseGuards(AuthGuard('jwt'))
    async getUserProfile(@User() usr: UserAuth, @Res() res) {
        const user = await this.usersService.getUserFromId(usr.userId)
        res.status(200).json(user)
    }

    @Get('areas')
    @UseGuards(AuthGuard('jwt'))
    async getAreas(@User() usr: UserAuth, @Res() res) {
        const areas = await this.userAreas.getAreas(usr.userId)
        res.status(200).json(areas)
    }

    @Delete('')
    @UseGuards(AuthGuard('jwt'))
    async deleteUsr(@User() usr: UserAuth, @Res() res) {
        const status = await this.usersService.deleteUser(usr.userId)
        res.status(200).json(status)
    }
}
