import { IsEmail, IsEmpty, IsEnum, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsEnum(["INTERN", "ADMIN", "ENGINEER"], {
        message: "Valid role required"
    })

    role: "INTERN" | "ENGINEER" | "ADMIN";

}