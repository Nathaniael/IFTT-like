import { Module } from '@nestjs/common';
import { ReactionsController } from './reactions.controller';

@Module({
  controllers: [ReactionsController]
})
export class ReactionsModule {}
