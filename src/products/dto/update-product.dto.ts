import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateProductDto {
    @ApiProperty({example: 1, description: 'Product Prrimary Key ID'})
    categoryID: number;

    @ApiProperty({ example: 'product company', description: 'Product companiyasi'})
    @IsNotEmpty()
    @IsString()
    vendor: string;

    @ApiProperty({ example: 'product nomi', description: 'Product nomi'})
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ example: 'product title', description: 'Product title'})
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({ example: 'product description', description: 'Product description'})
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({example: 120000, description: 'Product narxi'})
    @IsNumber()
    price: number;    

    @ApiProperty({example: 100, description: 'Product sonni'})
    @IsNumber()
    count: number;   
}