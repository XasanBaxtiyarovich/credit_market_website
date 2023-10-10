import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";

import { User } from "../../users/models/user.model";
import { Order } from "../../order/models/order.model";
import { History } from "../../history/models/history.model";

interface IBuyData {
    userID: number;
    cartNumber: string;
    pasportNumber: string;
    phoneNumber: string;
}

@Table({tableName: 'buy_data'})
export class BuyData extends Model<BuyData, IBuyData> {
    @ApiProperty({example: 1, description: 'Unique ID'})
    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
    id: number;
    @HasMany(() => Order)
    orders: Order[];

    @HasMany(() => History)
    histories: History[];

    @ApiProperty({example: 1, description: 'Primary Key User ID'})
    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userID: number;
    @BelongsTo(() => User)
    users: User;

    @ApiProperty({ example: 'user carta raqami', description: 'Foydalanuvchi karta raqami'})
    @Column ({ type: DataType.STRING })
    cartNumber: string;

    @ApiProperty({ example: 'user pasport raqami', description: 'Foydalanuvchi pasport raqami'})
    @Column ({ type: DataType.STRING })
    pasportNumber: string;

    @ApiProperty({example: '+998881758881', description: 'Foydalanuvchi telefon raqami'})
    @Column({ type: DataType.STRING })
    phoneNumber: string;
}