import { IsEmail, IsEmpty, IsEnum, IsOptional, IsString, Matches } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(['INTERN', 'ADMIN', 'ENGINEER'], {
    message: 'Valid role required',
  })
  role?: 'INTERN' | 'ENGINEER' | 'ADMIN' = 'INTERN';
}
