import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateHistoryDto {
    @ApiProperty({example: 1, description: 'Primary Key User ID'})
    @IsNumber()
    userDateID: number;

    @ApiProperty({example: 1, description: 'Primary Key Order ID'})
    @IsNumber()
    orderID: number;

    @ApiProperty({example: 'UzCard', description: 'Tolov usuli'})
    @IsString()
    paymentMethod: string;

    @ApiProperty({example: 111222, description: 'Nechpul tolov bogani'})
    @IsNumber()
    price: number;    

    @ApiProperty({example: '12-01-2202', description: 'Qachon tolov bolgani'})
    @IsNotEmpty()
    @IsString()
    date: Date;    
}
