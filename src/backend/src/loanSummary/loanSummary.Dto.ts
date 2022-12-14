import { PartialType } from '@nestjs/mapped-types';
import { LoanSummary } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  MaxDate,
  MinDate,
} from 'class-validator';
import * as dayjs from 'dayjs';

export class loanSummaryDto {
  @Type(() => Date)
  @Transform(({ value }) => new Date(value))
  @IsDate()
  startDate: Date = dayjs().subtract(1, 'd').toDate();

  @Type(() => Date)
  @Transform(({ value }) => new Date(value))
  @IsDate()
  endDate: Date = new Date();

  @Transform(({ value }) => Number(value))
  @IsNumber()
  pageNumber: number = 0;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  pageSize: number = 25;

  @IsOptional()
  sortColumn?: {
    id?: string;
    desc?: boolean;
  };
}

export class downloadLoanSummaryDto extends PartialType(loanSummaryDto) {
  @IsNotEmpty()
  endDate: Date;

  @IsNotEmpty()
  startDate: Date;
}
