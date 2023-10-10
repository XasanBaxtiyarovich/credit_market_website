import { IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderDto {
    @ApiProperty({example: 1, description: 'Primary Key Credit Product Information table ID'})
    @IsNumber()
    creditProductID: number;

    @ApiProperty({example: 1, description: 'Primary Key User Buy Data Information table ID'})
    @IsNumber()
    buyDataID: number;

    @ApiProperty({example: 1, description: 'Primary Key Admin Information table ID'})
    @IsNumber()
    adminID: number;
}
