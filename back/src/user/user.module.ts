import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserAreas } from './user.areas';
import { UserController } from './user.controller';
import { HttpModule, HttpService } from '@nestjs/axios';
import { AreasService } from 'src/areas/areas.service';
import { ActionsService } from 'src/actions/actions.service';
import { OauthService } from 'src/oauth/oauth.service';

@Module({
  imports: [HttpModule],
  providers: [UserService, UserAreas, AreasService, ActionsService, OauthService],
  exports: [UserService, UserAreas],
  controllers: [UserController]
})
export class UserModule { }
