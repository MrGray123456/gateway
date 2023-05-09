import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class GetUserTokenDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'xxx', description: '飞书临时token' })
  code: string;

  app_token: string;
}