import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { updatedUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Roles, User } from './users.schema';
import mongoose from 'mongoose';

@Injectable() //attach meta data
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private UserModel: mongoose.Model<User>,
  ) {}

  async findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN'): Promise<User[]> {
    console.log('role is: ', role);
    if (role) {
      const rolesArray = await this.UserModel.find({ roles: role }).exec();
      if (rolesArray.length === 0 || !rolesArray) {
        throw new NotFoundException('User role Not found');
      }
      return rolesArray;
    }
    return;
  }

  async findOne(id: number) {
    const user = await this.UserModel.findOne({ _id: id }).exec();

    return user;
  }

  create(user: CreateUserDto) {
    const newUser = {
      id: userByHighId[0].id + 1,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updatedUser: updatedUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updatedUser };
      }
      return user;
    });

    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);

    this.users = this.users.filter((user) => user.id !== id);

    return removedUser;
  }
}
