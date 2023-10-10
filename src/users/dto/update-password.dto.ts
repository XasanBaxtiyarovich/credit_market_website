import { ApiProperty } from "@nestjs/swagger";
import { IsStrongPassword, MinLength } from "class-validator";

export class UpdateUserPasswordDto {
    @ApiProperty({ example: 'password', description: 'Foydalanuvchi paroli'})
    @MinLength(6)
    @IsStrongPassword()
    password: string;

    @ApiProperty({ example: 'new password', description: 'Foydalanuvchi yangi paroli'})
    @MinLength(6)
    @IsStrongPassword()
    new_password: string;

    @ApiProperty({ example: 'password', description: 'Foydalanuvchi tasdiqlash paroli'})
    @MinLength(6)
    @IsStrongPassword()
    confirm_new_password: string;
}