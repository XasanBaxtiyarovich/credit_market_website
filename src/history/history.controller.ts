import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put } from '@nestjs/common';

import { History } from './models/history.model';
import { HistoryService } from './history.service';
import { AdminGuard } from '../guards/admin.guard';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';

@ApiTags('HISTORY-CRUD')
@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @ApiOperation( {summary: 'create new history' })
  @ApiResponse({ status: 200, type: History })
  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createHistoryDto: CreateHistoryDto) {
    return this.historyService.createHistory(createHistoryDto);
  }

  @ApiOperation( {summary: 'find all histories' })
  @ApiResponse({ status: 200, type: [History] })
  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.historyService.findAllHistory();
  }

  @ApiOperation( {summary: 'find one history' })
  @ApiResponse({ status: 200, type: History })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historyService.findOneHistory(+id);
  }

  @ApiOperation( {summary: 'update one history' })
  @ApiResponse({ status: 200, type: History })
  @UseGuards(AdminGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateHistoryDto: UpdateHistoryDto) {
    return this.historyService.updateHistory(+id, updateHistoryDto);
  }

  @ApiOperation( {summary: 'delete one history' })
  @ApiResponse({ status: 200, type: History })
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historyService.removeHistory(+id);
  }
}
