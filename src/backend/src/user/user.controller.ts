import { UpdateUserDto } from "./dto/updateuser.dto";
import { CreateUserDto } from "./dto/createuser.dto";
import { UserService } from "./user.service";
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from "@nestjs/common";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  registerUser(@Body() userData: CreateUserDto) {
    return this.userService.createUser(userData);
  }
  @Patch(":id")
  updateUser(
    @Param("id", ParseIntPipe) id: number,
    @Body() userData: UpdateUserDto
  ) {
    return this.userService.updateUser(id, userData);
  }
  @Get(":id")
  getUserById(@Param("id", ParseIntPipe) id: number) {
    return this.userService.getUser(id);
  }
  @Get()
  gellAllUser() {
    return this.userService.getAllUser();
  }
}
