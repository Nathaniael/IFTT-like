import { Body, Controller, Post } from '@nestjs/common';
import { AreaCreationDto } from './areas.dto';
import { AreasService } from './areas.service';

@Controller('areas')
export class AreasController {
    constructor(
        private readonly areasServices: AreasService,
    ) { }

    @Post('/create')
    async createArea(@Body() body: AreaCreationDto) {
        this.areasServices.createArea(body)
    }
}
