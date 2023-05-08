import { NestFactory } from '@nestjs/core';
import { VERSION_NEUTRAL, VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors';
import { AllExceptionsFilter, HttpExceptionFilter } from './common/exceptions';
import { generateDocument } from './utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 接口版本化管理
  app.enableVersioning({
    defaultVersion: [VERSION_NEUTRAL, '1', '2'],
    type: VersioningType.URI,
  });

  // 统一响应格式
  app.useGlobalInterceptors(new TransformInterceptor());

  // 添加全局异常过滤器
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter());

  // 生成接口文档
  generateDocument(app);

  await app.listen(3001);
}
bootstrap();
