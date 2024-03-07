import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';

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

    @Get() //quey params ---> /users?role=value&age=42
    findAll() {
        return [this.usersService.findAll()]    
    }

    @Get()
    findAllQ(@Query('role') role?: "INTERN" | "ENGINEER" | "ADMIN") {
        return [this.usersService.findAll(role)]
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id);
    }

    @Post()
    create(@Body() user: { name: string, email: string, role: 'INTERN' |
    'ENGINEER' | 'ADMIN'}) {
        return this.usersService.create(user);
    }

    @Patch(':id') 
    patchUser(@Param('id') id: string, @Body() userUpdate: { name?: string,
    email?: string, role?: 'INTERN' |'ENGINEER' | 'ADMIN'} ) {
        console.log("/:id is: ", id);
        return { id, ...userUpdate }
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string, @Body() userDelete: {}) {
        return this.usersService.delete(+id); //+ is the unary (+) for
        //converting to number
    }
}
