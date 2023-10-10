import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Order } from "../../order/models/order.model";

interface IAdmin {
    first_name: string;
    last_name: string;
    phone_number: string;
    mail: string;
    hashed_password: string;
    isActive: boolean;
    isAdmin: boolean;
    isSuperAdmin: boolean;
    hashed_refresh_token: string;
    activation_link: string;
}
@Table({tableName: 'admins'})
export class Admin extends Model<Admin, IAdmin> {
    @ApiProperty({example: 1, description: 'Unique ID'})
    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
    id: number;
    @HasMany(() => Order)
    orders: Order[];

    @ApiProperty({ example: 'admin ismi', description: 'Admin ismi'})
    @Column ({ type: DataType.STRING })
    first_name: string;

    @ApiProperty({ example: 'admin familyasi', description: 'Admin familyasi'})
    @Column ({ type: DataType.STRING })
    last_name: string;

    @ApiProperty({ example: '+998881758881', description: 'Admin bomeri'})
    @Column ({ type: DataType.STRING, unique: true})
    phone_number: string;

    @ApiProperty({ example: 'email@gmail.com', description: 'Admin emaili'})
    @Column ({ type: DataType.STRING, unique: true})
    mail: string;

    @ApiProperty({ example: 'password', description: 'Admin passwordi'})
    @Column ({ type: DataType.STRING })
    hashed_password: string;

    @ApiProperty({ example: 'false', description: 'Admin tasdiqlangan holati'})
    @Column ({ type: DataType.BOOLEAN, defaultValue: false})
    isActive: boolean;

    @ApiProperty({ example: 'false', description: 'Admin tasdiqlangan holati'})
    @Column ({ type: DataType.BOOLEAN, defaultValue: true})
    isAdmin: boolean;

    @ApiProperty({ example: 'false', description: 'Admin supermi'})
    @Column ({ type: DataType.BOOLEAN, defaultValue: false})
    isSuperAdmin: boolean;

    @ApiProperty({ example: 'hashed_refresh_token', description: 'Hashed Refresh token'})
    @Column ({ type: DataType.STRING })
    hashed_refresh_token: string;

    @ApiProperty({ example: 'https://localhost:4000', description: 'Admin Profile Activate link'})
    @Column({ type: DataType.STRING })
    activation_link: string;
}