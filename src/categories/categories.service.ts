import { InjectModel } from '@nestjs/sequelize';
import { BadRequestException, Injectable } from '@nestjs/common';

import { Category } from './models/category.model';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category) private readonly categoryRepo: typeof Category) {}

  async createCategory(createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryRepo.findOne({ where: {category_name: createCategoryDto.category_name} });
    if (category) throw new BadRequestException('CATEGORY NAME ALREADY EXISTS'); 

    const newCategory = await this.categoryRepo.create(createCategoryDto);

    return {message: 'Success', newCategory: newCategory};
  };

  async findAllCategories() {
    const categories = await this.categoryRepo.findAll();

    if(categories.length === 0) throw new BadRequestException('CATEGORIES NOT FOUND');

    return categories;
  };

  async findOneCategory(id: number) {
    const category= await this.categoryRepo.findOne({ where: {id} });

    if(!category) throw new BadRequestException('CATEGORY NOT FOUND');

    return category;
  };

  async updateOneCategory(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category= await this.categoryRepo.findOne({ where: {id} });

    if(!category) throw new BadRequestException('CATEGORY NOT FOUND');

    const updateCategory = await this.categoryRepo.update(
      {
        category_name: updateCategoryDto.category_name
      },
      {
        where: {id}, returning: true
      }
    );

    return updateCategory[1][0];
  };

  async removeOneCategory(id: number) {
    const category= await this.categoryRepo.findOne({ where: {id} });

    if(!category) throw new BadRequestException('CATEGORY NOT FOUND');

    await this.categoryRepo.destroy({where: {id}});

    return {deleteCategory: category};
  };
}
