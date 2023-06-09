import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('bootstrap');

  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 3000;

  await app.listen(port);
  logger.log(`Aplicación iniciada en el puerto ${port}`);
}
bootstrap();
