import { SetMetadata } from "@nestjs/common"

export const jwtConstants = {
    // 秘钥
    secret: 'yyds',
    // 时效时长
    expiresIn: '15s',
    // 是否忽略token时效
    ignoreExpiration: true
}

export const IS_PUBLIC_KEY = 'isPublic'

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true)