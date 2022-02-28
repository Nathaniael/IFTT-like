import { Body, Controller, Post, UseGuards } from '@nestjs/common';
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
    async createArea(@User() user, @Body() body: AreaCreationDto) {
        this.areasServices.createArea(user["payload"].userId, body)
    }
}
