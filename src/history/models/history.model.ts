import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";

import { Order } from "../../order/models/order.model";
import { BuyData } from "../../buy_data/models/buy_data.model";

interface IHistory {
    userDateID: number;
    orderID: number;
    paymentMethod: string;
    price: number;
    date: Date;
}
@Table({ tableName: 'history' })
export class History extends Model<History, IHistory>{
    @ApiProperty({example: 1, description: 'Unique ID'})
    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({example: 1, description: 'Primary Key User ID'})
    @ForeignKey(() => BuyData)
    @Column({ type: DataType.INTEGER })
    userDateID: number;
    @BelongsTo(() => BuyData)
    buyData: BuyData;

    @ApiProperty({example: 1, description: 'Primary Key Order ID'})
    @ForeignKey(() => Order)
    @Column({ type: DataType.INTEGER })
    orderID: number;
    @BelongsTo(() => Order)
    order: Order;

    @ApiProperty({example: 'UzCard', description: 'Tolov usuli'})
    @Column({ type: DataType.STRING })
    paymentMethod: string;

    @ApiProperty({example: 111222, description: 'Nechpul tolov bogani'})
    @Column({ type: DataType.INTEGER })
    price: number;    

    @ApiProperty({example: '12-01-2202', description: 'Qachon tolov bolgani'})
    @Column({ type: DataType.DATE })
    date: Date;    
}