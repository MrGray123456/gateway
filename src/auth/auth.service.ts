import { FeishuService } from '@/feishu/feishu.service';
import { UserService } from '@/user/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private feishuService: FeishuService
  ) {

  }

  async validateFeishuUser(code: string) {
    const feishuInfo = await this.getFeishuTokenByApplications(code)
    const user = await this.userService.createOrUpdateByFeishu(feishuInfo)

    return {
      userId: user.id,
      username: user.username,
      name: user.name,
      email: user.email,
      feishuAccessToken: feishuInfo.accessToken,
      feishuUserId: feishuInfo.feishuUserId,
    };
  }

  async login(user) {
    return {
      access_token: this.jwtService.sign(user)
    }
  }

  async getFeishuTokenByApplications(code: string) {
    const data = await this.feishuService.getUserToken(code)
    const feishuInfo = {
      accessToken: data.access_token,
      avatarBig: data.avatar_big,
      avatarMiddle: data.avatar_middle,
      avatarThumb: data.avatar_thumb,
      avatarUrl: data.avatar_url,
      email: data.email,
      enName: data.en_name,
      mobile: data.mobile,
      name: data.name,
      feishuUnionId: data.union_id,
      feishuUserId: data.user_id,
    }

    return feishuInfo
  }
}
