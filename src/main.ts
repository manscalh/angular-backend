import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ClassSerializerInterceptor, HttpStatus, ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';
import { API_CONSTANTS } from './config/API.constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter, {
    // Prisma Error Code: HTTP Status Response
    P2000: HttpStatus.BAD_REQUEST,
    P2002: HttpStatus.CONFLICT,
    P2025: HttpStatus.NOT_FOUND,
  }));

  const description = "API Salomao";

  const config = new DocumentBuilder()
    .setTitle('API Salomao')
    .setDescription(description)
    .setVersion(API_CONSTANTS.API_VERSION_NUMBER)
    .addBearerAuth()

    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(API_CONSTANTS.API_VERSION, app, document, {
    swaggerOptions: {
      apisSorter: 'alpha',
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    }
  });

  app.enableCors({
    origin: [
      'http://localhost:4200',
      'http://10.111.250.96'
    ],
    methods: ["GET", "POST", "DELETE", "PATCH", "UPDATE", "OPTIONS"],
    credentials: true,
  });

  await app.listen(API_CONSTANTS.API_PORT);
}
bootstrap();
