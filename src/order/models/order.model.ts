import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";

import { Admin } from "../../admins/models/admin.model";
import { History } from "../../history/models/history.model";
import { BuyData } from "../../buy_data/models/buy_data.model";
import { CreditProduct } from "../../credit_product/models/credit_product.model";

interface IOrder {
    creditProductID: number;
    buyDataID: number;
    adminID: number;
    startPrice: boolean;
    countMonth: number;
    datePrice: Date;
    finish: boolean;
}
@Table({ tableName: 'order' })
export class Order extends Model<Order, IOrder> {
    @ApiProperty({example: 1, description: 'Unique ID'})
    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
    id: number;
    @HasMany(() => History)
    buyData: History[];

    @ApiProperty({example: 1, description: 'Primary Key Credit Product Information table ID'})
    @ForeignKey(() => CreditProduct)
    @Column({ type: DataType.INTEGER })
    creditProductID: number;
    @BelongsTo(() => CreditProduct)
    creditProducts: CreditProduct;

    @ApiProperty({example: 1, description: 'Primary Key User Buy Data Information table ID'})
    @ForeignKey(() => BuyData)
    @Column({ type: DataType.INTEGER })
    buyDataID: number;
    @BelongsTo(() => BuyData)
    buydata: BuyData;

    @ApiProperty({example: 1, description: 'Primary Key Admin Information table ID'})
    @ForeignKey(() => Admin)
    @Column({ type: DataType.INTEGER })
    adminID: number;
    @BelongsTo(() => Admin)
    admin: Admin;

    @ApiProperty({example: true, description: 'Boshlang\'ich tolov qilindimi'})
    @Column({ type: DataType.BOOLEAN, defaultValue: true })
    startPrice: boolean;

    @ApiProperty({example: 0, description: 'Nechi oy tolandi'})
    @Column({ type: DataType.INTEGER, defaultValue: 0 })
    countMonth: number;

    @ApiProperty({example: '12-21-2222', description: 'Tolov qilinadigan voht'})
    @Column({ type: DataType.DATE, defaultValue: new Date() })
    datePrice: Date;   
    
    @ApiProperty({example: false, description: 'Tugaganmi'})
    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    finish: boolean;
}