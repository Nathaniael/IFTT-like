import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserAreas } from './user.areas';
import { UserController } from './user.controller';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [UserService, UserAreas],
  exports: [UserService, UserAreas],
  controllers: [UserController]
})
export class UserModule { }
