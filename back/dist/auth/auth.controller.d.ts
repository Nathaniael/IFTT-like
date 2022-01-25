import { UserCreationDto, UserRegistrationDto } from '../user/user.dto';
import { UserService } from '../user/user.service';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
export declare class AuthController {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    registerUser(body: UserCreationDto, res: Response): Promise<void>;
    loginUser(body: UserRegistrationDto, res: Response): Promise<void>;
}
