import { NestFactory } from '@nestjs/core';
import { VERSION_NEUTRAL, VersioningType, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
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

  // https://www.npmjs.org/package/cookie
  app.use(cookieParser('secret', {}));

  // 统一响应格式
  app.useGlobalInterceptors(new TransformInterceptor());

  // 添加全局异常过滤器
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter());

  // 启动全局校验管道
  app.useGlobalPipes(new ValidationPipe());

  // 生成接口文档
  generateDocument(app);

  // 配置Winston日志：https://lsmod.medium.com/nestjs-setting-up-file-logging-daily-rotation-with-winston-28147af56ec4
  // https://medium.com/cp-massive-programming/how-to-log-nestjs-applications-in-a-distributed-system-part-1-winston-91193a1ba813

  await app.listen(3001);
}
bootstrap();
