import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: 'http://localhost:8081', credentials: true , allowedHeaders:'Set-Cookie, content-type'});
  app.use(cookieParser());
  await app.listen(8080);
  app.use(cookieParser());
  app.use(function(req, res, next) {
    // res.header('Access-Control-Allow-Credentials', true)
    // res.header('Access-Control-Allow-Origin', 'http://localhost:8081')
    res.header('Access-Control-Allow-Headers', 'Set-Cookie')
    next();
  });
}
bootstrap();
