import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AreasModule } from 'src/areas/areas.module';
import { AreasService } from 'src/areas/areas.service';
import { WebhooksController } from './webhooks.controller';
import { WebhooksService } from './webhooks.service';

@Module({
  imports: [HttpModule],
  controllers: [WebhooksController],
  providers: [WebhooksService, AreasService]
})
export class WebhooksModule {
}
