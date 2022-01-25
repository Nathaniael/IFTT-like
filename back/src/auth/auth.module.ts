import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt'


@Module({
  imports: [UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '24h',
      },
    }),],
  controllers: [AuthController]
})
export class AuthModule { }
