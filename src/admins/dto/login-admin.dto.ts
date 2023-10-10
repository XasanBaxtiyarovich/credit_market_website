import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class LoginAdminDto {
    @ApiProperty({ example: 'email@gmail.com', description: 'Admin emaili'})
    @IsEmail()
    mail: string;
    
    @ApiProperty({ example: 'password', description: 'Admin paroli'})
    @IsString()
    password: string;
}