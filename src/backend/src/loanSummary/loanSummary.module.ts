import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { LoanSummaryController } from './loanSummary.controller';
import { LoanSummaryService } from './loanSummary.service';

@Module({
  imports: [],
  controllers: [LoanSummaryController],
  providers: [LoanSummaryService, PrismaService],
})
export class LoanSummary {}
