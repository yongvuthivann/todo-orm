import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from "./transform.interceptor";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new TransformInterceptor())
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  )
  const port = process.env.PORT
  app.enableCors({
    credentials: true
  })
  await app.listen(port);
}
bootstrap();
