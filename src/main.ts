import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const config = new DocumentBuilder()
  .setTitle('Exam Task')
  .setDescription('Mini project for Credit Market')
  .setVersion('1.0.0')
  .addTag('NodeJS, NestJS, Postgress, Sequelize, JWT, Swagger')
  .build();

  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("/api/docs", app, document);

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, () => console.log('Server raning on '+PORT) );
}
bootstrap();