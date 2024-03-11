import { IsEmail, IsEmpty, IsEnum, IsString, Matches } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsEmpty()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @IsEnum(['INTERN', 'ADMIN', 'ENGINEER'], {
    message: 'Valid role required',
  })
  role: 'INTERN' | 'ENGINEER' | 'ADMIN';
}
