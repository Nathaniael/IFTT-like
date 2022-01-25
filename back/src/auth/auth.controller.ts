import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { UserCreationDto, UserDto } from '../user/user.dto';
import { UserService } from '../user/user.service';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    @Post('register')
    async registerUser(@Body() body: UserCreationDto, @Res() res: Response) {
        await this.userService.registerUser(body)
        console.log("henlo2")
        const user = await this.userService.getUser(body)
        const payload = { userId: user.id, username: user.username };
        console.log(process.env.JWT_SECRET)
        console.log(payload)
        console.log(this.jwtService.sign(payload))
        res.cookie('access_token', {}, {
            httpOnly: true,
            domain: 'localhost', // your domain here!
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        }).send({ success: true });

    }
}
