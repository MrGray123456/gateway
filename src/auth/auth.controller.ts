import { Controller, Get, Query, Res, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Public } from './constants';
import { PayloadUser } from '@/helper/auth';
import { Response } from 'express';

@ApiTags('用户认证')
@Controller({
    path: 'auth',
    version: [VERSION_NEUTRAL]
})
export class AuthController {
    constructor(private authService: AuthService) { }

    @ApiOperation({ summary: '飞书Auth2登录', description: '通过code获取access_token' })
    @Public()
    @Get('feishu/auth2')
    async getFeishuTokenByApplications(
        @PayloadUser() user: Payload,
        @Res({ passthrough: true }) response: Response,
        @Query() query: { code: string }
    ) {
        const { access_token } = await this.authService.login(user)
        response.cookie('jwt', access_token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 7,
            path: '/'
        })

        return access_token
    }

    @ApiOperation({ summary: '解析token', description: '解析token信息' })
    @Get('token/info')
    async getTokenInfo(@PayloadUser() user: Payload) {
        return user
    }
}
