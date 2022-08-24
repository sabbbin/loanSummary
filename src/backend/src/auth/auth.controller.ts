import { Controller, Get, Post, Req, Session, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { IsPublic } from 'src/guards/public.decorators';
import { RefreshAuthGuard } from '../guards/auth.refreshToken.guard';

import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  @IsPublic()
  @UseGuards(AuthGuard('local'))
  loginUser(@Req() req: Request, @Session() session: Record<string, unknown>) {
    const { refreshToken, ...rest } = this.authService.login(req.user);
    session.refreshToken = refreshToken as string;
    return rest;
  }

  @Get('refresh')
  @IsPublic()
  @UseGuards(RefreshAuthGuard)
  getRefreshToken(@Req() req: Request) {
    const value = this.authService.login(req.user, false);
    return value;
  }
}
