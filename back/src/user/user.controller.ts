import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user.decorator';

@Controller('user')
export class UserController {

    @Get('hello')
    @UseGuards(AuthGuard('jwt'))
    async test(@User() user) {
        console.log(user)
    }
}
