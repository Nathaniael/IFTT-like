import { Body, Controller, Get, Post, UseGuards, Res, BadRequestException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserAuth } from 'src/auth/auth.controller';
import { User } from './user.decorator';
import { OauthCreationDto } from './user.dto';
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

    @Get('profile')
    @UseGuards(AuthGuard('jwt'))
    async getUserProfile(@User() usr: UserAuth, @Res() res) {
        if (usr.username !== undefined) {
            res.status(200).json(usr.username)
        } else if (usr["payload"].username !== undefined) {
            res.status(200).json(usr["payload"].username)
        } else {
            res.status(200).json("undefined")
        }
    }

    @Get('areas')
    @UseGuards(AuthGuard('jwt'))
    async getAreas(@User() usr: UserAuth, @Res() res) {
        var userId;
        if (usr["payload"]?.userId !== undefined) {
            userId = usr["payload"].userId
        } else if (usr?.userId !== undefined) {
            userId = usr.userId
        } else {
            throw new BadRequestException("User not found")
        }
        const areas = await this.userAreas.getAreas(userId)
        res.status(200).json(areas)
    }
}
