import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { JwtAuthGuard } from './auth.jwt.guard';
import { JwtStrategy } from './auth.jwt.strategy';
import { LocalGuardStrategy } from './auth.localguard.strategy';
import { RefreshTokenStrategy } from './auth.refreshToken.strategy';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: 'abc',
      signOptions: {
        expiresIn: '10min',
      },
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    LocalGuardStrategy,
    RefreshTokenStrategy,
  ],
  controllers: [AuthController],
})
export class Authmodule {}
