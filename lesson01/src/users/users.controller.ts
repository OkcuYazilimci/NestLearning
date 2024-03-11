import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { updatedUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  /*
    GET /users
    GET /users/:id
    POST /users
    PATCH /users/:id
    DELETE /users/:id
    */

  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    console.log('role in cont: ', role);
    return [this.usersService.findAll(role)];
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Post()
  create(
    @Body(ValidationPipe)
    user: CreateUserDto /*{ name: string, email: string, role: 'INTERN' |
    'ENGINEER' | 'ADMIN'}*/,
  ) {
    return this.usersService.create(user);
  }

  @Patch(':id')
  patchUser(
    @Param('id') id: string,
    @Body() userUpdate: updatedUserDto /*{ name?: string,
    email?: string, role?: 'INTERN' |'ENGINEER' | 'ADMIN'}*/,
  ) {
    console.log('/:id is: ', id);
    return { id, ...userUpdate };
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string, @Body() userDelete: {}) {
    return this.usersService.delete(+id); //+ is the unary (+) for
    //converting to number
  }
}
