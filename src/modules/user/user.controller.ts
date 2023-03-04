import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserService } from './user.service';

@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createNewUser(@Body() userDto: CreateUserDto): Promise<void> {
    await this.userService.create(userDto);
  }

  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    return this.userService.getById(id);
  }

  @Patch('/:id')
  @UsePipes(ValidationPipe)
  async updateUser(@Param('id') id: string, @Body() userDto: UpdateUserDto) {
    return this.userService.update(id, userDto);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') { id }) {
    await this.userService.delete(id);
  }
}
