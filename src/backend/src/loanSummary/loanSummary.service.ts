import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { downloadLoanSummaryDto, loanSummaryDto } from './loanSummary.Dto';
import * as fs from 'fs';
import { LoanSummary, Prisma } from '@prisma/client';

@Injectable()
export class LoanSummaryService {
  constructor(private prisma: PrismaService) {}
  async getLoanDataByDate(query) {
    query.sortColumn = JSON.parse(query.sortColumn);
    let data = await this.prisma.loanSummary.findMany({
      skip: (query.pageNumber * query.pageSize) | 0,
      take: query.pageSize,
      where: {
        ReportDate: {
          gte: query.startDate,
          lte: query.endDate,
        },
      },
      orderBy: {
        [query.sortColumn.id]: query.sortColumn.desc ? 'desc' : 'asc',
      },
    });
    return data;
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
    query.pageSize = undefined;
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
