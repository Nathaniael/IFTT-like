import { Body, Controller, Post } from '@nestjs/common';

@Controller('actions')
export class ActionsController {
    @Post('/Gitlab')
    async createHook(@Body() body) {
        
    }
}
