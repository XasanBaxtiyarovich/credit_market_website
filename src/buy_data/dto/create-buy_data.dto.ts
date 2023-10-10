import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from "class-validator";

export class CreateBuyDataDto {
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
    @IsPhoneNumber('UZ')
    phoneNumber: string;
}