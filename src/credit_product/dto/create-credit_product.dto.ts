import { IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCreditProductDto {
    @ApiProperty({example: 1, description: 'Primary Key Product ID'})
    @IsNumber()
    productID: number;

    @ApiProperty({ example: 'kredit nech oy', description: 'Kredit nechi oy tolanishi'})
    @IsNumber()
    creditMonth: number;

    @ApiProperty({ example: 'boshlan\'ich tolov', description: 'Boshlang\'ich nechpul tolanishi'})
    @IsNumber()
    startPrice: number;

    @ApiProperty({example: 'oyli tolov', description: 'Har oy nechpuldan tolanishi'})
    @IsNumber()
    monthPrice: number;

    @ApiProperty({example: 'umumiy tolov', description: 'Umumiy tolangan narx necha puligi'})
    @IsNumber()
    sumPrice: number; 
}