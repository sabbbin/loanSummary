import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateUserDto } from "./dto/createuser.dto";
import { UpdateUserDto } from "./dto/updateuser.dto";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  getUserByUsername(username: string) {
    return this.prisma.user.findFirst({
      where: {
        username,
      },
    });
  }

  getUser(id: number) {
    return this.prisma.user.findFirst({
      where: { id },
    });
  }

  createUser(data: CreateUserDto) {
    return this.prisma.user.create({
      data,
    });
  }

  updateUser(id: number, updateUserDto: UpdateUserDto) {
    console.log();
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  deleteUser(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  getAllUser() {
    return this.prisma.user.findMany({});
  }
}
