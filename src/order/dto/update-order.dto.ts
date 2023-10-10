import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsString } from "class-validator";

export class UpdateOrderDto {
    @ApiProperty({example: 1, description: 'Primary Key Credit Product Information table ID'})
    @IsNumber()
    creditProductID: number;

    @ApiProperty({example: 1, description: 'Primary Key User Buy Data Information table ID'})
    @IsNumber()
    buyDataID: number;

    @ApiProperty({example: 1, description: 'Primary Key Admin Information table ID'})
    @IsNumber()
    adminID: number;

    @ApiProperty({example: true, description: 'Boshlang\'ch tolov berildimi'})
    @IsBoolean()
    startPrice: boolean;
    
    @ApiProperty({example: 2, description: 'Nechi oyga tolangani'})
    @IsNumber()
    countMonth: number;

    @ApiProperty({example: '12-12-1222', description: 'Tolov qilinadigan voht'})
    @IsString()
    datePrice: Date;

    @ApiProperty({example: false, description: 'Tugaganmi'})
    @IsBoolean()
    finish: boolean;
}