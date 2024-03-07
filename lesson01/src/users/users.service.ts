import { Injectable } from '@nestjs/common';

@Injectable() //attach meta data
export class UsersService {
    private users = [
        {
            "id": 1,
            "name": "Umut Uygun",
            "email": "umut.uygun@arcelik.com",
            "role": "ENGINEER",
        },
        {
            "id": 2,
            "name": "Caglar Kilcipglu",
            "email": "caglar.kilcioglu@arcelik.com",
            "role": "ADMIN",
        },
        {
            "id": 3,
            "name": "Melih Tosun",
            "email": "melih.tosun@arcelik.com",
            "role": "INTERN",
        },
    ]

    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        if (role) {
            return this.users.filter(user => user.role === role)
        }
        return this.users;
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id)

        return user;
    }

    create(user: {name: string, email: string, role: 'INTERN' |
     'ENGINEER' | 'ADMIN'}) {
        const userByHighId = [...this.users].sort((a,b) => b.id = a.id)
        const newUser = {
            id: userByHighId[0].id + 1,
            ...user
        }
        this.users.push(newUser)
        return newUser;
    }

    update(id: number, updatedUser: {name?: string, email?: string, role?: 'INTERN' |
    'ENGINEER' | 'ADMIN'}) {
        this.users = this.users.map(user => {
            if (user.id === id) {
                return {...user, ...updatedUser}
            }
            return user
        })

        return this.findOne(id)
    }

    delete(id: number) {
        const removedUser = this.findOne(id)
        
        this.users = this.users.filter(user => user.id !== id)

        return removedUser;
    }
}

    
