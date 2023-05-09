import { BusinessException } from '@/common/exceptions';
import { BUSINESS_ERROR_CODES } from '@/common/exceptions/business.error.codes';
import { getUserToken, refreshUserToken } from '@/helper/auth';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';

@Injectable()
export class FeishuService {
  private USER_TOKEN_CACHE_KEY: string
  private USER_REFRESH_TOKEN_CACHE_KEY: string
  constructor(
    @Inject(CACHE_MANAGER) private cacheManage: Cache,
    private readonly configService: ConfigService,
  ) {
    this.USER_TOKEN_CACHE_KEY = this.configService.get('USER_TOKEN_CACHE_KEY')
    this.USER_REFRESH_TOKEN_CACHE_KEY = this.configService.get('USER_REFRESH_TOKEN_CACHE_KEY')
  }

  async getUserToken(code: string) {
    const app_token = await this.getAppToken()
    const dto = { code, app_token }
    const res = await getUserToken(dto)
    if (res.code !== 0) {
      throw new BusinessException(res.msg)
    }

    return res
  }

  async setUserCacheToken(tokenInfo: any) {
    const { user_id, access_token, refresh_token, expires_in, refresh_expires_in } = tokenInfo
    await this.cacheManage.set(
      `${this.USER_TOKEN_CACHE_KEY}_${user_id}`,
      access_token,
      expires_in - 60
    )

    await this.cacheManage.set(
      `${this.USER_REFRESH_TOKEN_CACHE_KEY}_${user_id}`,
      refresh_token,
      refresh_expires_in - 60
    )
  }

  async getCacheUserToken(user_id: string) {
    let userToken: string = await this.cacheManage.get(`${this.USER_TOKEN_CACHE_KEY}_${user_id}`)

    if (!userToken) {
      const refresh_token: string = await this.cacheManage.get(`${this.USER_REFRESH_TOKEN_CACHE_KEY}_${user_id}`)
      if (!refresh_token) {
        throw new BusinessException({
          code: BUSINESS_ERROR_CODES.TOKEN_INVALID,
          message: 'token失效'
        })

        const userTokenInfo = await this.getUserTokenByRefreshToken(refresh_token)
        await this.setUserCacheToken(userTokenInfo)
        userToken = userTokenInfo.access_token
      }
    }

    return userToken
  }

  async getUserTokenByRefreshToken(refresh_token: string) {
    return await refreshUserToken({
      refresh_token,
      app_token: await this.getAppToken()
    })
  }

  async getAppToken() {
    return 'aaaa'
  }
}
