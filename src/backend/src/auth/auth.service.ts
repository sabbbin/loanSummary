import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUser(usename: string, password: string) {
    let user = await this.userService.getUserByUsername(usename);
    if (user && user.password == password) {
      const { password, ...rest } = user;
      return rest;
    }
    return null;
  }

  login(user, refreshTokenFlag = true) {
    let payload = {
      id: user.id,
      username: user.usename,
      role: user.role,
    };
    const { password, ...rest } = user;
    const sessionObj: Record<string, unknown> = {
      access_token: this.jwtService.sign(payload),
      user: rest,
    };
    if (refreshTokenFlag) {
      sessionObj.refreshToken = this.jwtService.sign(payload, {
        secret: 'refresh',
        expiresIn: '2d',
      });

      return sessionObj;
    }
  }
}
