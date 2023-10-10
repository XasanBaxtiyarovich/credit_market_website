import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class UpdateAdminDto {
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
}