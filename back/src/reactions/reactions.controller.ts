import { Body, Controller, Post } from '@nestjs/common';

@Controller('reactions')
export class ReactionsController {

    @Post('/mail')
    async printstp(@Body() body) {
        console.log("hello")
    }
}
