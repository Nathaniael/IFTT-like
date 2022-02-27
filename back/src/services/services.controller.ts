import { Controller, Body ,Get, UseGuards } from '@nestjs/common';
import { ServicesService } from './services.service';
import { AuthGuard } from '@nestjs/passport';
import { UserAuth } from 'src/auth/auth.controller';
import { User } from '../user/user.decorator';

@Controller('services')
export class ServicesController {
    constructor(
        private readonly servicesService: ServicesService
    ) { }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    async getServices(@User() usr: UserAuth) {
        return this.servicesService.getServices();
    }

    @Get('actions')
    @UseGuards(AuthGuard('jwt'))
    async getActionsByServiceId(@User() usr: UserAuth, @Body() body: { id: number }) {
        return this.servicesService.getActionsByServiceId(body.id);
    }

    @Get('reactions')
    @UseGuards(AuthGuard('jwt'))
    async getReactionsByServiceId(@User() usr: UserAuth, @Body() body: { id: number }) {
        return this.servicesService.getReactionsByServiceId(body.id);
    }
}
