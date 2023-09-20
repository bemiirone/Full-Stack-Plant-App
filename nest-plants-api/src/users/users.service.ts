// users.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './user.schema';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';


@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    const result: any = await this.userModel.find().exec();
    if (result.length && result[0]._doc && result[0]._doc.data) {
      return result[0]._doc.data;
    }
    return [];
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });
    return user.save();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.userModel.findByIdAndDelete(id).exec();
    return result != null;
  }
}

