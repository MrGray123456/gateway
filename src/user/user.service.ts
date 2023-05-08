import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';

import { BusinessException } from 'src/common/exceptions';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private APP_TOKEN_CACHE_KEY: string

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private configService: ConfigService
  ) {
    this.APP_TOKEN_CACHE_KEY = this.configService.get('APP_TOKEN_CACHE_KEY')
  }

  async getAppToken() {
    let appToken = await this.cacheManager.get(this.APP_TOKEN_CACHE_KEY)
    if (!appToken) {
      // const response  = await getAppToken()
      const response = { code: 0, app_access_token: 'aaaa', expires: 1000 }
      if (response.code === 0) {
        appToken = response.app_access_token
        this.cacheManager.set(this.APP_TOKEN_CACHE_KEY, appToken, response.expires - 60)
      } else {
        throw new BusinessException('调用异常')
      }
    }

    return appToken
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
