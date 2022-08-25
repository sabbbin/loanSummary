import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: 'abc',
    });
  }
  async validate(userInfo: any) {
    if (!userInfo) throw new UnauthorizedException();
    const user = await this.userService.getUser(userInfo.id);
    const { password, ...rest } = user;
    return rest;
  }
}
