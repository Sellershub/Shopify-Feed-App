import { getAnalytics } from 'firebase/analytics';
// import { HelperService } from '@/helper/helper.service';
import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from '~/app.module';
import {
  DEFAULT_API_PORT,
  DEFAULT_API_PREFIX,
  DEFAULT_SWAGGER_PREFIX,
} from '~/constants';
import { GlobalExceptionFilter } from '~/global-exception.filter';

(async () => {
  const app: INestApplication = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix(process.env.API_PREFIX || DEFAULT_API_PREFIX);
  app.useGlobalPipes();
  // app.useGlobalFilters(
  //   new GlobalExceptionFilter(app.get<HelperService>(HelperService)),
  // );

  const config = new DocumentBuilder()
    .setTitle('Shopify App API')
    .addBearerAuth(
      {
        type: 'http',
        name: 'authorization',
        in: 'header',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'JWT',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(
    process.env.SWAGGER_PREFIX || DEFAULT_SWAGGER_PREFIX,
    app,
    document,
  );
  const Port = process.env.LOCAL_PORT ?? DEFAULT_API_PORT;
  await app.listen(Port);
  console.log(`app listen on port ${Port}`);
})();
