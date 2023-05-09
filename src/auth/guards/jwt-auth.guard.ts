import { BusinessException } from "@/common/exceptions";
import { BUSINESS_ERROR_CODES } from "@/common/exceptions/business.error.codes";
import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { IS_PUBLIC_KEY } from "../constants";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super()
    }

    canActivate(context: ExecutionContext) {
        const loginAuth = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass()
        ])

        if (loginAuth) {
            return true
        }

        return super.canActivate(context)
    }

    handleRequest(err, user, info: Error) {
        if (err || !user) {
            throw err || new BusinessException({
                code: BUSINESS_ERROR_CODES.TOKEN_INVALID,
                message: 'token已失效'
            })
        }

        return user
    }
}