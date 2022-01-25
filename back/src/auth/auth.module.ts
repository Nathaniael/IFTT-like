import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config';


@Module({
  imports: [UserModule,
    JwtModule.registerAsync(
      {
        inject: [
          ConfigService
        ],
        useFactory: (config: ConfigService) => {
          return {
            secret: process.env.JWT_SECRET,
            signOptions: {
              expiresIn: '24h',
            },
          }
        }
      },
    ),],
  controllers: [AuthController]
})
export class AuthModule { }
