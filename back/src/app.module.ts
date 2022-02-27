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
import { AreasService } from './areas/areas.service';
import { AreasController } from './areas/areas.controller';
import { AreasModule } from './areas/areas.module';
import { ReactionsModule } from './reactions/reactions.module';
import { AboutModule } from './about/about.module';
import { ServicesService } from './services/services.service';
import { ServicesController } from './services/services.controller';
import { ServicesModule } from './services/services.module';


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
    WebhooksModule,
    AreasModule,
    ReactionsModule,
    AboutModule,
    ServicesModule,],
  controllers: [AppController, ServicesController],
  providers: [AppService, ServicesService],
})
export class AppModule { }
