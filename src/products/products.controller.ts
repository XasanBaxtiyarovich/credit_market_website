import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put } from '@nestjs/common';

import { Product } from './models/product.model';
import { AdminGuard } from '../guards/admin.guard';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@ApiTags('PRODUCTS')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation( {summary: 'create product' })
  @ApiResponse({ status: 200, type: Product })
  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }

  @ApiOperation( {summary: 'find all producta' })
  @ApiResponse({ status: 200, type: [Product] })
  @Get()
  findAll() {
    return this.productsService.findAllProducts();
  }

  @ApiOperation( {summary: 'find one product' })
  @ApiResponse({ status: 200, type: Product })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOneProduct(+id);
  }

  @ApiOperation( {summary: 'update product' })
  @ApiResponse({ status: 200, type: Product })
  @UseGuards(AdminGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.updateOneProduct(+id, updateProductDto);
  }

  @ApiOperation( {summary: 'delete product' })
  @ApiResponse({ status: 200, type: Product })
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.removeOneProduct(+id);
  }
}
