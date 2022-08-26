import { Module } from '@nestjs/common';
import { Authmodule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { LoanSummaryModule } from './loanSummary/loanSummary.module';

@Module({
  imports: [LoanSummaryModule, Authmodule],
})
export class AppModule {}
