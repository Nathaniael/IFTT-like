import { HttpModule, HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { OauthService } from 'src/oauth/oauth.service';
import { ActionsController } from './actions.controller';
import { ActionsService } from './actions.service';

@Module({
  imports: [HttpModule],
  controllers: [ActionsController],
  providers: [ActionsService, OauthService]
})
export class ActionsModule {
}
