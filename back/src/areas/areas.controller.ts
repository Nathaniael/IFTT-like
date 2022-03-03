import { Body, Controller, Post, UseGuards, Res, BadRequestException } from '@nestjs/common';
import { AreaCreationDto } from './areas.dto';
import { AreasService } from './areas.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/user.decorator';
import { userInfo } from 'os';

@Controller('areas')
export class AreasController {
    constructor(
        private readonly areasServices: AreasService,
    ) { }

    @Post('/create')
    @UseGuards(AuthGuard('jwt'))
    async createArea(@User() user, @Body() body: AreaCreationDto, @Res() res) {
        var userId;
        if (user["payload"]?.userId != undefined) {
            userId = user["payload"].userId
        } else if (user.userId != undefined) {
            userId = user.userId
        } else {
            throw new BadRequestException("Can't get user")
        }
        await this.areasServices.createArea(userId, body)
        res.status(200).json("Area well created")
    }
}
