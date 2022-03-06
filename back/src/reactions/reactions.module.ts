import { HttpModule, HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { ReactionsController } from './reactions.controller';

@Module({
  controllers: [ReactionsController],
  providers: [UserService],
  imports: [HttpModule]
})
export class ReactionsModule {}
