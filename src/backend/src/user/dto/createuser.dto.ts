import { Role } from '@prisma/client';

import { IsEnum, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  status: string;
  @IsNotEmpty()
  password: string;
  @IsEnum(Role)
  role: Role;
}
