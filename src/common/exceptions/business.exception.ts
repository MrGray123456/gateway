import { HttpException, HttpStatus } from "@nestjs/common";
import { BUSINESS_ERROR_CODES } from "./business.error.codes";


type BusinessError = {
  code: number;
  message: string;
}

export class BusinessException extends HttpException {
  constructor(message: BusinessError | string) {
    if (typeof message === 'string') {
      message = {
        code: BUSINESS_ERROR_CODES.COMMON,
        message
      }
    }
    super(message, HttpStatus.OK);
  }

  static throwForbidden() {
    throw new BusinessException({
      code: BUSINESS_ERROR_CODES.ACCESS_FORBIDDEN,
      message: '禁止访问'
    });
  }
}