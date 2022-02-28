import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import jwtDecode from 'jwt-decode';
import { UserAuth } from 'src/auth/auth.controller';
import { UserService } from './user.service';

async function getUser(access_token: string) {
    const jwt = await jwtDecode(access_token) as { userId: string, username: string }
    const usr = new UserAuth(jwt)
    return usr

}


export const User = createParamDecorator(async (data: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (request.headers.access_token) {
        return getUser(request.headers.access_token)
    } else {
        return undefined
    }
});