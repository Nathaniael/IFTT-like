import { Body, Controller, Get, Post, UseGuards, Res, BadRequestException, Delete } from '@nestjs/common';
import { AreaCreationDto, AreaId } from './areas.dto';
import { AreasService } from './areas.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/user.decorator';
import { userInfo } from 'os';
import { UserAuth } from 'src/auth/auth.controller';
import { HttpService } from '@nestjs/axios';
import { UserAreas } from 'src/user/user.areas';

@Controller('areas')
export class AreasController {
    constructor(
        private readonly areasServices: AreasService,
        private readonly httpService: HttpService,
        private readonly usersArea: UserAreas
    ) { }

    @Post('/create')
    @UseGuards(AuthGuard('jwt'))
    async createArea(@User() user, @Body() body: AreaCreationDto, @Res() res) {
        await this.areasServices.createArea(user.userId, body)
        await this.usersArea.AreaNumber(user.userId)
        res.status(200).send("Area well created")
    }

    @Post('/delete')
    @UseGuards(AuthGuard('jwt'))
    async deleteArea(@User() user: UserAuth, @Body() body: AreaId, @Res() res) {
        await this.areasServices.deleteArea(body.id.toString())
        await this.usersArea.AreaNumber(user.userId)
        const r = await this.httpService.post('http://localhost:8080/webhooks/Area', {action_type: "Area deleted", userId: user.userId, id: body.id}).toPromise()
        // console.log(r)
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
