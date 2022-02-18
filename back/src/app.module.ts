import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SlonikModule } from 'nestjs-slonik';
import { ConfigModule } from '@nestjs/config';
import { validateEnvironmentVariables } from './config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { OauthModule } from './oauth/oauth.module';
import { WebhooksModule } from './webhooks/webhooks.module';


@Module({
  imports: [
    SlonikModule.forRoot({
      connectionUri: 'postgres://root:root@postgres/root',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnvironmentVariables,
      envFilePath: './.env',
    }),
    AuthModule,
    UserModule,
    OauthModule,
    WebhooksModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
