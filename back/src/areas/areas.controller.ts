import { Body, Controller, Get, Post, UseGuards, Res, BadRequestException, Delete } from '@nestjs/common';
import { AreaCreationDto, AreaId } from './areas.dto';
import { AreasService } from './areas.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/user.decorator';
import { userInfo } from 'os';
import { UserAuth } from 'src/auth/auth.controller';

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
        res.status(200).send("Area well created")
    }

    @Post('/delete')
    @UseGuards(AuthGuard('jwt'))
    async deleteArea(@User() user, @Body() body: AreaId, @Res() res) {
        var userId;
        if (user["payload"]?.userId != undefined) {
            userId = user["payload"].userId
        } else if (user.userId != undefined) {
            userId = user.userId
        } else {
            throw new BadRequestException("Can't get user")
        }
        this.areasServices.deleteArea(body.id)
        res.status(200).send("Area deleted successfully")
    }

    @Get('/get')
    @UseGuards(AuthGuard('jwt'))
    async getAreasByUser(@User() user, @Body() body, @Res() res) {
        var userId;
        if (user["payload"]?.userId != undefined) {
            userId = user["payload"].userId
        } else if (user.userId != undefined) {
            userId = user.userId
        } else {
            throw new BadRequestException("Can't get user")
        }
        res.status(200).json(await this.areasServices.getAreaByUser(userId))
    }
}
