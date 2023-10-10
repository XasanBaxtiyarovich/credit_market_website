import { ApiProperty } from "@nestjs/swagger";
import { IsStrongPassword, MinLength } from "class-validator";

export class UpdateAdminPasswordDto {
    @ApiProperty({ example: 'password', description: 'Admin paroli'})
    @MinLength(6)
    @IsStrongPassword()
    password: string;

    @ApiProperty({ example: 'password', description: 'Admin yangi paroli'})
    @MinLength(6)
    @IsStrongPassword()
    new_password: string;

    @ApiProperty({ example: 'password', description: 'Admin tasdiqlash yangi parolini'})
    @MinLength(6)
    @IsStrongPassword()
    confirm_new_password: string;
}