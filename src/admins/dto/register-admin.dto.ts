import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, IsStrongPassword, MinLength } from "class-validator";

export class RegisterAdminDto {
    @ApiProperty({ example: 'user ismi', description: 'Admin ismi'})
    @IsNotEmpty()
    @IsString()
    first_name: string;

    @ApiProperty({ example: 'user familyasi', description: 'Admin familyasi'})
    @IsNotEmpty()
    @IsString()
    last_name: string;

    @ApiProperty({ example: "+998881758881", description: 'Admin telefon raqami'})
    @IsPhoneNumber('UZ')
    phone_number: string;
    
    @ApiProperty({ example: 'email@gmail.com', description: 'Admin emaili'})
    @IsEmail()
    mail: string;
    
    @ApiProperty({ example: 'password', description: 'Admin paroli'})
    @MinLength(6)
    @IsStrongPassword()
    password: string;

    @ApiProperty({ example: 'password', description: 'Admin tasdiqlash paroli'})
    @MinLength(6)
    @IsStrongPassword()
    confirm_password: string;
}