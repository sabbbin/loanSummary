import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import session from 'express-session';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refresh',
) {
  constructor(private userService: UserService) {
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
  async validate(userInfo: any) {
    if (!userInfo) throw new UnauthorizedException();
    const user = await this.userService.getUser(userInfo.id);
    const { password, ...rest } = user;
    return rest;
  }
}
