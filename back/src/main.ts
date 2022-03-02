import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:8081','http://pantharea.fun:8081', '213.32.89.51:8080'],
    credentials: true,
    allowedHeaders:'Set-Cookie, content-type, X-Hub-Signature'});
  app.use(cookieParser());
  await app.listen(8080);
  app.use(cookieParser());
}
bootstrap();
