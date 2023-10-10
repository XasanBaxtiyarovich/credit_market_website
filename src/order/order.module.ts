import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';

import { Order } from './models/order.model';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';

@Module({
  imports: [SequelizeModule.forFeature([Order]), JwtModule.register({}) ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
