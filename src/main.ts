import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: '*',
    credentials: true
  });
  await app.listen(process.env.PORT ?? 7777, "0.0.0.0");
}
bootstrap();
