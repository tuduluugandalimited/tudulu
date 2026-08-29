// D:\tudulu\apps\api\src\users\users.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
// import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Uncomment when auth guard is ready

ApiTags("users");
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: "Register a new user" })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // @UseGuards(JwtAuthGuard) // Protect routes that require login
  @Get()
  @ApiOperation({ summary: "Get all users" })
  findAll() {
    return this.usersService.findAll();
  }

  // @UseGuards(JwtAuthGuard)
  @Get(":id")
  @ApiOperation({ summary: "Get user by ID" })
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(id);
  }

  // @UseGuards(JwtAuthGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Update user profile" })
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Delete user account" })
  remove(@Param("id") id: string) {
    return this.usersService.remove(id);
  }
}
