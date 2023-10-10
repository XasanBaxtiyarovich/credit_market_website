import { InjectModel } from '@nestjs/sequelize';
import { BadRequestException, Injectable } from '@nestjs/common';

import { Order } from './models/order.model';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order) private readonly orderRepo: typeof Order) {}

  createOrder(createOrderDto: CreateOrderDto) {
    return this.orderRepo.create(createOrderDto);
  }

  async findAllOrders() {
    const orders = await this.orderRepo.findAll({include: {all: true}});

    if (orders.length === 0) throw new BadRequestException('ORDERS NOT FOUND');

    return orders;
  }

  async findOneOrder(id: number) {
    const order = await this.orderRepo.findOne({where: {id}, include: {all: true}});

    if (!order) throw new BadRequestException('ORDER NOT FOUND');

    return order;
  }

  async updateOrder(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderRepo.findOne({where: {id}});
    if (!order) throw new BadRequestException('ORDER NOT FOUND');

    const updateOrder = await this.orderRepo.update(
      {
        creditProductID: updateOrderDto.creditProductID,
        buyDataID: updateOrderDto.buyDataID,
        adminID: updateOrderDto.adminID,
        startPrice: updateOrderDto.startPrice,
        countMonth: updateOrderDto.countMonth,
        datePrice: updateOrderDto.datePrice,
        finish: updateOrderDto.finish
      },
      {
        where: {id}, returning: true
      }
    );

    return updateOrder[1][0];
  }

  async removeOrder(id: number) {
    const order = await this.orderRepo.findOne({where: {id}});
    if (!order) throw new BadRequestException('ORDER NOT FOUND');

    await this.orderRepo.destroy({where: {id}});

    return {deleteOrder: order};
  }
}
