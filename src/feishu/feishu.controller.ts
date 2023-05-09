import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { FeishuService } from './feishu.service';
import { GetUserTokenDto } from './feishu.dto';

@Controller('feishu')
export class FeishuController {
  constructor(private readonly feishuService: FeishuService) { }

  @ApiOperation({
    summary: '获取用户token',
  })
  @Post('getUserToken')
  getUserToken(@Body() params: GetUserTokenDto) {
    const { code } = params
    return this.feishuService.getUserToken(code)
  }
}
