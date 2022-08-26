import { Module } from '@nestjs/common';
import { Authmodule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { LoanSummary } from './loanSummary/loanSummary.module';

@Module({
  imports: [LoanSummaryUserModule, Authmodule],
})
export class AppModule {}
