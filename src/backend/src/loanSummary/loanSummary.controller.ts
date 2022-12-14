import { Controller, Get, Query, Res, StreamableFile } from '@nestjs/common';
import { createReadStream, fstat } from 'fs';
import { downloadLoanSummaryDto, loanSummaryDto } from './loanSummary.Dto';
import { LoanSummaryService } from './loanSummary.service';
import type { Response } from 'express';
import * as fs from 'fs';

@Controller('loanSummary')
export class LoanSummaryController {
  constructor(private loanSummary: LoanSummaryService) {}

  @Get()
  async getLoanSummaryByDate(@Query() query: loanSummaryDto) {
    let dataAndCount = await Promise.all([
      this.loanSummary.getLoanDataByDate(query),
      this.loanSummary.getCountLoanDataByDate(query),
    ]);

    return {
      data: dataAndCount[0],
      totalCount: dataAndCount[1],
    };
  }

  @Get('download')
  async getCountLoanSummaryByDate(
    @Query() query: downloadLoanSummaryDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    let filename = await this.loanSummary.getDownloadLoanSummaryByDate(query);
    const file = createReadStream(`${filename}`);
    file.on('end', () => {
      fs.unlinkSync(filename);
    });
    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename:"loanSummary.csv"',
    });
    return new StreamableFile(file);
  }
}
