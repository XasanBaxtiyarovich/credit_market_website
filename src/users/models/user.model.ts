import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";

import { BuyData } from './../../buy_data/models/buy_data.model';

interface IUser {
    first_name: string;
    last_name: string;
    age: number;
    mail: string;
    hashed_password: string;
    isActive: boolean;
    hashed_refresh_token: string;
    activation_link: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, IUser> {
    @ApiProperty({example: 1, description: 'Unique ID'})
    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
    id: number;
    @HasMany(() => BuyData)
    buyData: BuyData[];

    @ApiProperty({ example: 'user ismi', description: 'Foydalanuvchi ismi'})
    @Column ({ type: DataType.STRING })
    first_name: string;

    @ApiProperty({ example: 'user familyasi', description: 'Foydalanuvchi familyasi'})
    @Column ({ type: DataType.STRING })
    last_name: string;

    @ApiProperty({example: 18, description: 'Foydalanuvchi yoshi'})
    @Column({ type: DataType.INTEGER })
    age: number;
    
    @ApiProperty({ example: 'email@gmail.com', description: 'Foydalanuvchi emaili'})
    @Column ({ type: DataType.STRING, unique: true})
    mail: string;

    @ApiProperty({ example: 'password', description: 'Foydalanuvchi passwordi'})
    @Column ({ type: DataType.STRING })
    hashed_password: string;

    @ApiProperty({ example: 'false', description: 'Foydalanuvchi tasdiqlangan holati'})
    @Column ({ type: DataType.BOOLEAN, defaultValue: false})
    isActive: boolean;

    @ApiProperty({ example: 'hashed_refresh_token', description: 'Hashed Refresh token'})
    @Column ({ type: DataType.STRING })
    hashed_refresh_token: string;

    @ApiProperty({ example: 'https://localhost:4000', description: 'User Profile Activate link'})
    @Column({ type: DataType.STRING })
    activation_link: string;
}