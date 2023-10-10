import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';

import { Category } from './models/category.model';
import { AdminGuard } from '../guards/admin.guard';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('CATEGORIES')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation( {summary: 'create category' })
  @ApiResponse({ status: 200, type: Category })
  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.createCategory(createCategoryDto);
  };

  @ApiOperation( {summary: 'find all categories' })
  @ApiResponse({ status: 200, type: [Category] })
  @Get()
  findAll() {
    return this.categoriesService.findAllCategories();
  };

  @ApiOperation( {summary: 'find one category' })
  @ApiResponse({ status: 200, type: Category })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOneCategory(+id);
  };

  @ApiOperation( {summary: 'update one category' })
  @ApiResponse({ status: 200, type: Category })
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.updateOneCategory(+id, updateCategoryDto);
  };

  @ApiOperation( {summary: 'delete one category' })
  @ApiResponse({ status: 200, type: Category })
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.removeOneCategory(+id);
  };
};