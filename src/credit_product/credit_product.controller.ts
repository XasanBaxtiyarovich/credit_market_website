import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put } from '@nestjs/common';

import { AdminGuard } from '../guards/admin.guard';
import { CreditProduct } from './models/credit_product.model';
import { CreditProductService } from './credit_product.service';
import { CreateCreditProductDto } from './dto/create-credit_product.dto';
import { UpdateCreditProductDto } from './dto/update-credit_product.dto';

@ApiTags('CREDIT_PRODUCT_INFORMATION_CRUD')
@Controller('credit-product')
export class CreditProductController {
  constructor(private readonly creditProductService: CreditProductService) {}

  @ApiOperation( {summary: 'create credit product information' })
  @ApiResponse({ status: 200, type: CreditProduct }) 
  @UseGuards(AdminGuard) 
  @Post()
  create(@Body() createCreditProductDto: CreateCreditProductDto) {
    return this.creditProductService.createCreditProduct(createCreditProductDto);
  }

  @ApiOperation( {summary: 'find all credit product information' })
  @ApiResponse({ status: 200, type: [CreditProduct] })
  @Get()
  findAll() {
    return this.creditProductService.findAllCreditProducts();
  }

  @ApiOperation( {summary: 'find one credit product information' })
  @ApiResponse({ status: 200, type: CreditProduct }) 
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.creditProductService.findOneCreditProduct(+id);
  }

  @ApiOperation( {summary: 'update credit product information' })
  @ApiResponse({ status: 200, type: CreditProduct }) 
  @UseGuards(AdminGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateCreditProductDto: UpdateCreditProductDto) {
    return this.creditProductService.updateCreditProduct(+id, updateCreditProductDto);
  }

  @ApiOperation( {summary: 'remove credit product information' })
  @ApiResponse({ status: 200, type: CreditProduct }) 
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.creditProductService.removeCreditProduct(+id);
  }
}
