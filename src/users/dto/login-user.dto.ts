import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class LoginUserDto {
    @ApiProperty({ example: 'email@gmail.com', description: 'Foydalanuvchi emaili'})
    @IsEmail()
    mail: string;
    
    @ApiProperty({ example: 'password', description: 'Foydalanuvchi paroli'})
    @IsString()
    password: string;
}