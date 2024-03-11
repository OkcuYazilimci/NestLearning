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

  async findAll(): Promise<User[]> { 
    const users = await this.UserModel.find();
    return users;
  }

  async findByRole(role?: 'INTERN' | 'ENGINEER' | 'ADMIN'): Promise<User[]> {
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

  async findOne(id: string) {
    const user = await this.UserModel.findOne({ _id: id }).lean().exec();

    return user;
  }

  async create(user: CreateUserDto): Promise<User> {
    const isEmailUnique = await this.isEmailUnique(user.email);
    if(!isEmailUnique) throw new Error('Email Already exists!') ;

    const newUser: CreateUserDto = {
      name: user.name,
      email: user.email,
      password: user.password,
    };
    const res = await this.UserModel.create(newUser);
    return res; 
  } 

  async isEmailUnique(email: string): Promise<Boolean> {
    const emails = await this.UserModel.find({email}).lean().exec();

    return emails.length === 0;
  }
}

  /*update(id: number, updatedUser: updatedUserDto) {
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
  }*/
