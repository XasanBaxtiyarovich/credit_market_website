import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsStrongPassword, MinLength, IsEmail, IsNumber } from "class-validator";

export class RegisterUserDto {
    @ApiProperty({ example: 'user ismi', description: 'Foydalanuvchi ismi'})
    @IsNotEmpty()
    @IsString()
    first_name: string;

    @ApiProperty({ example: 'user familyasi', description: 'Foydalanuvchi familyasi'})
    @IsNotEmpty()
    @IsString()
    last_name: string;

    @ApiProperty({ example: 18, description: 'Foydalanuvchi yoshi'})
    @IsNumber()
    age: number;
    
    @ApiProperty({ example: 'email@gmail.com', description: 'Foydalanuvchi emaili'})
    @IsEmail()
    mail: string;
    
    @ApiProperty({ example: 'password', description: 'Foydalanuvchi paroli'})
    @MinLength(6)
    @IsStrongPassword()
    password: string;

    @ApiProperty({ example: 'password', description: 'Foydalanuvchi tasdiqlash paroli'})
    @MinLength(6)
    @IsStrongPassword()
    confirm_password: string;
}