import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty({ example: 'kategoriya nomi', description: 'Kategoriya nomi'})
    @IsNotEmpty()
    @IsString()
    category_name: string;
}