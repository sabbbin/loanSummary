import { PartialType } from '@nestjs/mapped-types';
import { Transform, Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  MaxDate,
  MinDate,
  minDate,
} from 'class-validator';

export class loanSummaryDto {
  @Type(() => Date)
  @Transform(({ value }) => new Date(value))
  @MinDate(new Date(2018, 1, 1))
  @IsNotEmpty()
  @IsDate()
  startDate: Date;

  @Type(() => Date)
  @Transform(({ value }) => new Date(value))
  @MaxDate(new Date())
  @IsNotEmpty()
  @IsDate()
  endDate: Date;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsNotEmpty()
  pageNumber: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsNotEmpty()
  pageSize: number;
}

export class downloadLoanSummaryDto extends PartialType(loanSummaryDto) {
  @IsNotEmpty()
  endDate: Date;

  @IsNotEmpty()
  startDate: Date;
}
