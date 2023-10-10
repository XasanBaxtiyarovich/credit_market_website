import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";

import { Order } from "../../order/models/order.model";
import { Product } from "../../products/models/product.model";

interface ICreditProduct {
    productID: number;
    creditMonth: number;
    startPrice: number;
    monthPrice: number;
    sumPrice: number;
}

@Table({ tableName: 'credit_product' })
export class CreditProduct extends Model<CreditProduct, ICreditProduct>{
    @ApiProperty({example: 1, description: 'Unique ID'})
    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
    id: number;
    @HasMany(() => Order)
    orders: Order[];

    @ApiProperty({example: 1, description: 'Primary Key Product ID'})
    @ForeignKey(() => Product)
    @Column({ type: DataType.INTEGER })
    productID: number;
    @BelongsTo(() => Product)
    products: Product;

    @ApiProperty({ example: 'kredit nech oy', description: 'Kredit nechi oy tolanishi'})
    @Column ({ type: DataType.INTEGER })
    creditMonth: number;

    @ApiProperty({ example: 'boshlan\'ich tolov', description: 'Boshlang\'ich nechpul tolanishi'})
    @Column ({ type: DataType.INTEGER })
    startPrice: number;

    @ApiProperty({example: 'oyli tolov', description: 'Har oy nechpuldan tolanishi'})
    @Column({ type: DataType.INTEGER })
    monthPrice: number;

    @ApiProperty({example: 'umumiy tolov', description: 'Umumiy tolangan narx necha puligi'})
    @Column({ type: DataType.INTEGER })
    sumPrice: number;    
}