import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ActionsService } from 'src/actions/actions.service';

@Injectable()
export class WebhooksService {
    constructor(
        private readonly actionService: ActionsService
    ) {}

    @Cron('*/30 * * * * *')
    async getActions() {
        console.log('hello')
        // this.actionService.updateWeather()
    }
}
