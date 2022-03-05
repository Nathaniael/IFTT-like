import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ActionsModule } from 'src/actions/actions.module';
import { ActionsService } from 'src/actions/actions.service';
import { OauthService } from 'src/oauth/oauth.service';
import { AreasController } from './areas.controller';
import { AreasService } from './areas.service';

@Module({
    imports: [HttpModule],
    providers: [AreasService, ActionsService, OauthService],
    controllers: [AreasController]
})
export class AreasModule {
}
