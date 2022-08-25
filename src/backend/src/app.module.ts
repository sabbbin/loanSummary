import { Module } from '@nestjs/common';
import { Authmodule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, Authmodule],
})
export class AppModule {}
