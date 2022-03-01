import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { UserCreationDto, UserDto, UserLoginDto } from '../user/user.dto';
import { UserService } from '../user/user.service';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

export class UserAuth {
    userId: string
    username: string
    constructor(data: UserAuth) {
        Object.assign(this, data)
    }
}
@Controller('auth')
export class AuthController {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private configService: ConfigService
    ) { }

    @Post('register')
    async registerUser(@Body() body: UserCreationDto, @Res() res: Response) {
        const user = await this.userService.registerUser(body)
        const payload = { userId: user.id, username: user.username };
        const signed_payload = this.jwtService.sign(payload)
        res.cookie('access_token', signed_payload, {
            httpOnly: false,
            domain: 'pantharea.fun',
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        }).send({ success: true, access_token: signed_payload });

    }

    @Post('login')
    async loginUser(@Body() body: UserLoginDto, @Res({passthrough: true}) res: Response) {
        try {
            const user = await this.userService.getUser(body)
            const payload = new UserAuth({ userId: user.id, username: user.username });
            const signed_payload = this.jwtService.sign({ payload })
            res.cookie('access_token', signed_payload, {
                httpOnly: false,
                domain: 'pantharea.fun',
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
            }).send({ success: true, access_token: signed_payload });
        } catch(err) {
            res.send({ success: false, message: err.message });
        }
    }
}
