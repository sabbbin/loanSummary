import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { downloadLoanSummaryDto, loanSummaryDto } from './loanSummary.Dto';
import * as fs from 'fs';

@Injectable()
export class LoanSummaryService {
  constructor(private prisma: PrismaService) {}
  getLoanDataByDate(query) {
    return this.prisma.loanSummary.findMany({
      skip: query.pageNumber * query.pageSize,
      take: query.pageSize,
      where: {
        ReportDate: {
          gte: query.startDate,
          lte: query.endDate,
        },
      },
    });
  }

  getCountLoanDataByDate(query: loanSummaryDto) {
    return this.prisma.loanSummary.count({
      where: {
        ReportDate: {
          lte: query.endDate,
          gte: query.startDate,
        },
      },
    });
  }
  async getDownloadLoanSummaryByDate(query: downloadLoanSummaryDto) {
    query.pageNumber = 0;
    query.pageSize = 0;

    const downloadData = await this.getLoanDataByDate(query);
    const csvString = [];
    const header = Object.keys(downloadData[0]);
    csvString.push(header);
    for (let value of downloadData) {
      csvString.push(Object.values(value));
    }
    let recordfile = csvString.join('\n');
    let filename = 'loansummary.csv';
    fs.writeFileSync(`${filename}`, recordfile);
    return filename;
  }
}
