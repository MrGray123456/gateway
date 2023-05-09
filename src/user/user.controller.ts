import { Controller, Get, Version, VERSION_NEUTRAL } from '@nestjs/common';
import { UserService } from './user.service';
import { BusinessException } from 'src/common/exceptions/business.exception';
import { ConfigService } from '@nestjs/config';

@Controller({
  path: 'user',
  version: '1',
})
export class UserController {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService
  ) { }

  @Get('getTestName')
  getTestName() {
    console.log(this.configService.get('RUNNING_ENV'), this.configService.get('TEST_VALUE'))
    return this.configService.get('TEST_VALUE').name
  }

  @Get()
  @Version([VERSION_NEUTRAL, '1'])
  findAll() {
    const a: any = {}
    try {
      console.log(a.b.c)
    } catch (error) {
      throw new BusinessException('参数使用错误')
    }
    return this.userService.findAll();
  }

  @Get()
  @Version('2')
  findAll2() {
    return 'i am a new one'
  }
}
