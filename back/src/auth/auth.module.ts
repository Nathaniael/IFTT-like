import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config';
import { AuthStrategy } from './auth.strategy';


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
  controllers: [AuthController],
  providers: [AuthStrategy]
})
export class AuthModule { }
