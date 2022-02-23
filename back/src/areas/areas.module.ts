import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AreasController } from './areas.controller';
import { AreasService } from './areas.service';

@Module({
    imports: [HttpModule],
    providers: [AreasService],
    controllers: [AreasController]
})
export class AreasModule {
}
