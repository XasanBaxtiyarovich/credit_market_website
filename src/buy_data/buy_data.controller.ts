import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';

import { UserGuard } from '../guards/user.guard';
import { BuyData } from './models/buy_data.model';
import { AdminGuard } from '../guards/admin.guard';
import { BuyDataService } from './buy_data.service';
import { CreateBuyDataDto } from './dto/create-buy_data.dto';
import { UpdateBuyDataDto } from './dto/update-buy_data.dto';

@ApiTags('BUY DATA')
@Controller('buy-data')
export class BuyDataController {
  constructor(private readonly buyDataService: BuyDataService) {}

  @ApiOperation( {summary: 'create buy data' })
  @ApiResponse({ status: 200, type: BuyData })
  @UseGuards(UserGuard)
  @Post()
  create(@Body() createBuyDataDto: CreateBuyDataDto) {
    return this.buyDataService.createBuyData(createBuyDataDto);
  }

  @ApiOperation( {summary: 'find all buy data' })
  @ApiResponse({ status: 200, type: [BuyData] })
  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.buyDataService.findAllBuyData();
  }

  @ApiOperation( {summary: 'find one buy data' })
  @ApiResponse({ status: 200, type: BuyData })
  @UseGuards(AdminGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.buyDataService.findOneBuyData(+id);
  }

  @ApiOperation( {summary: 'update one buy data' })
  @ApiResponse({ status: 200, type: BuyData })
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBuyDataDto: UpdateBuyDataDto) {
    return this.buyDataService.updateBuyData(+id, updateBuyDataDto);
  }

  @ApiOperation( {summary: 'delete one data' })
  @ApiResponse({ status: 200, type: BuyData })
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.buyDataService.removeBuyData(+id);
  }
}
