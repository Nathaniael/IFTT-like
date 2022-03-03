import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserAreas } from './user.areas';
import { UserController } from './user.controller';

@Module({
  providers: [UserService, UserAreas],
  exports: [UserService, UserAreas],
  controllers: [UserController]
})
export class UserModule { }
