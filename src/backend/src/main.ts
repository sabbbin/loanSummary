import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');
  app.use(
    session({
      secret: 'session-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.set('trust proxy', 'loopback');
  await app.listen(3000);
}
bootstrap();
