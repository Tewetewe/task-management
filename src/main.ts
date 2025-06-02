import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  // Allow CORS for your frontend
  app.enableCors({
    origin: 'http://localhost:5001',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Task Manager API')
    .setDescription('JWT-protected API for user tasks')
    .setVersion('1.0')
    .addBearerAuth() // enable Authorization: Bearer <token>
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // available at /api

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));


  await app.listen(3000);
}
bootstrap();
