import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import type { RedisClientOptions } from 'redis';

import { UserModule } from './user/user.module';
import { getConfig } from './utils';

const redisConfig = getConfig('REDIS_CONFIG')

// 配置的运行环境变量优先级高于.env文件中的配置
// redis一定要小于4版本，cache-manager-redis-store不支持redisv4
@Module({
  imports: [
    CacheModule.register<RedisClientOptions>({
      isGlobal: true,
      store: redisStore,
      host: redisConfig.host,
      port: redisConfig.port,
      auth_pass: redisConfig.password,
      db: redisConfig.db,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [getConfig]
    }),
    UserModule
  ],
})
export class AppModule { }
