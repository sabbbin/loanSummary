import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { JwtAuthGuard } from '../guards/auth.jwt.guard';
import { JwtStrategy } from '../guards/auth.jwt.strategy';

import { RefreshTokenStrategy } from '../guards/auth.refreshToken.strategy';
import { AuthService } from './auth.service';
import { LocalGuardStrategy } from 'src/guards/auth.localguard.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: 'abc',
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    LocalGuardStrategy,
    RefreshTokenStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  controllers: [AuthController],
})
export class Authmodule {}
