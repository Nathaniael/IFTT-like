import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ActionsModule } from 'src/actions/actions.module';
import { ActionsService } from 'src/actions/actions.service';
import { OauthService } from 'src/oauth/oauth.service';
import { UserAreas } from 'src/user/user.areas';
import { AreasController } from './areas.controller';
import { AreasService } from './areas.service';

@Module({
    imports: [HttpModule],
    providers: [AreasService, ActionsService, OauthService, UserAreas],
    controllers: [AreasController]
})
export class AreasModule {
}
