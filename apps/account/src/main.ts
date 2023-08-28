import { NestFactory } from '@nestjs/core';
import { AccountModule } from './account.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AccountModule);
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService)

  const config = new DocumentBuilder()
  .setTitle('Acccount Service  API')
  .setDescription('Api will be used for creating accounts amonst other things')
  .setVersion('2.0')
  .addTag('Haggai')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(configService.get('PORT', 3000));
}
bootstrap();
