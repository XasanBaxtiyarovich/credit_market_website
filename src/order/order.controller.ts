import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put } from '@nestjs/common';

import { Order } from './models/order.model';
import { OrderService } from './order.service';
import { AdminGuard } from '../guards/admin.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@ApiTags('ORDER_CRUD')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({summary: 'create one order'})
  @ApiResponse({ status: 200, type: Order })
  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto);
  }

  @ApiOperation({summary: 'find all orders'})
  @ApiResponse({ status: 200, type: [Order] })
  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.orderService.findAllOrders();
  }

  @ApiOperation({summary: 'find one order'})
  @ApiResponse({ status: 200, type: Order })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOneOrder(+id);
  }
 
  @ApiOperation({summary: 'update one order'})
  @ApiResponse({ status: 200, type: Order })
  @UseGuards(AdminGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.updateOrder(+id, updateOrderDto);
  }

  @ApiOperation({summary: 'delete one order'})
  @ApiResponse({ status: 200, type: Order })
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.removeOrder(+id);
  }
}
