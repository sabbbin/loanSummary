import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class LocalGuardStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    let user = await this.authService.validateUser(username, password);

    if (!user) return new UnauthorizedException();

    return user;
  }
}
