import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class UpdateUserDto {
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
}