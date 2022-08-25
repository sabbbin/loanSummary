import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUser(usename: string, password: string) {
    let user = await this.userService.getUserByUsername(usename);
    if (user && argon.verify(user.password, password)) {
      const { password, ...rest } = user;

      return rest;
    }
    return null;
  }

  login(user, refreshTokenFlag = true) {
    console.log(user);
    let payload = {
      id: user.id,
    };

    const sessionObj: Record<string, unknown> = {
      access_token: this.jwtService.sign(payload),
      user,
    };
    if (refreshTokenFlag) {
      sessionObj.refreshToken = this.jwtService.sign(payload, {
        secret: 'refresh',
        expiresIn: '2d',
      });
    }

    return sessionObj;
  }
}
