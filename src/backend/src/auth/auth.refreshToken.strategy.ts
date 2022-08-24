import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import session from 'express-session';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req.session.refreshToken;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: 'refresh',
    });
  }
  validate(userinfo: any) {
    if (!userinfo) throw new UnauthorizedException();
    return userinfo;
  }
}
