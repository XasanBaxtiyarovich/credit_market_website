import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateBuyDataDto {
    @ApiProperty({example: 1, description: 'Primary Key User ID'})
    @IsNumber()
    userID: number;

    @ApiProperty({ example: 'user carta raqami', description: 'Foydalanuvchi karta raqami'})
    @IsNotEmpty()
    @IsString()
    cartNumber: string;

    @ApiProperty({ example: 'user pasport raqami', description: 'Foydalanuvchi pasport raqami'})
    @IsNotEmpty()
    @IsString()
    pasportNumber: string;

    @ApiProperty({example: '+998881758881', description: 'Foydalanuvchi telefon raqami'})
    @IsNotEmpty()
    @IsString()
    phoneNumber: string;
}