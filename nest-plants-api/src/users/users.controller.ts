// users.controller.ts

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/users')
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get('/users/:id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  @Post('/users')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Put('/users/:id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(id, updateUserDto);
    if (!user) {
      throw new BadRequestException(`Failed to update user with ID ${id}`);
    }
    return user;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const success = await this.usersService.remove(id);
    if (!success) {
      throw new BadRequestException(`Failed to delete user with ID ${id}`);
    }
    return { message: 'User deleted successfully' };
  }
}

