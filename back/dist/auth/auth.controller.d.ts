import { UserCreationDto, UserLoginDto } from '../user/user.dto';
import { UserService } from '../user/user.service';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export declare class UserAuth {
    userId: string;
    username: string;
    constructor(data: UserAuth);
}
export declare class AuthController {
    private readonly userService;
    private readonly jwtService;
    private configService;
    constructor(userService: UserService, jwtService: JwtService, configService: ConfigService);
    registerUser(body: UserCreationDto, res: Response): Promise<void>;
    loginUser(body: UserLoginDto, res: Response): Promise<void>;
}
