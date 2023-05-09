import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

@Injectable()
export class FeishuStrategy extends PassportStrategy(Strategy, 'feishu') {
    constructor(private authService: AuthService) {
        super()
    }

    async validate(req: Request) {
        const user = await this.authService.validateFeishuUser(req.body.code)
        if (!user) {
            throw new UnauthorizedException()
        }

        return user
    }
}