import { ICategoryService } from './interfaces/service.interface';
import { CategoryRepository } from '../repositories/category.repository';
import { CategoryCreateRequestDTO } from '../dtos/requests/create.request.dto';
import { CategoryUpdateRequestDTO } from '../dtos/requests/update.request.dto';
import {
  ICategory,
  ICategoryMessage,
  ICategoryListMessage,
} from '../interfaces/category.interface';
import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class CategoryService implements ICategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async store(
    categoryCreateRequestDTO: CategoryCreateRequestDTO,
  ): Promise<ICategoryMessage> {
    const categoryNameExists: ICategory =
      await this.categoryRepository.showName(categoryCreateRequestDTO.name);

    if (categoryNameExists) {
      return {
        status: HttpStatus.CONFLICT,
        time: new Date(),
        message: 'Category name already exists',
        data: [],
      };
    }

    const category: ICategory = await this.categoryRepository.store(
      categoryCreateRequestDTO,
    );

    return {
      status: HttpStatus.CREATED,
      time: new Date(),
      message: 'Category created with success',
      data: category,
    };
  }

  async show(categoryId: string): Promise<ICategoryMessage> {
    const category = await this.categoryRepository.show(categoryId);

    if (!category) {
      return {
        status: HttpStatus.NOT_FOUND,
        time: new Date(),
        message: 'Category name already exists',
        data: [],
      };
    }

    return {
      status: HttpStatus.OK,
      time: new Date(),
      message: 'Category returned with success',
      data: category,
    };
  }

  async index(page: number): Promise<ICategoryListMessage> {
    const categories = await this.categoryRepository.index({ page });

    return {
      status: HttpStatus.OK,
      time: new Date(),
      message: 'List of categories returned with success',
      result: categories,
    };
  }

  async update(
    categoryId: string,
    categoryUpdateRequestDTO: CategoryUpdateRequestDTO,
  ): Promise<ICategoryMessage> {
    const categoryNameExists: ICategory =
      await this.categoryRepository.showName(categoryUpdateRequestDTO.name);

    if (categoryNameExists) {
      return {
        status: HttpStatus.CONFLICT,
        time: new Date(),
        message: 'Category name already exists',
        data: [],
      };
    }

    const categoryExists = await this.categoryRepository.show(categoryId);

    if (!categoryExists) {
      return {
        status: HttpStatus.NOT_FOUND,
        time: new Date(),
        message: 'Category not found',
        data: [],
      };
    }

    const category: ICategory = await this.categoryRepository.update(
      categoryId,
      categoryUpdateRequestDTO,
    );

    return {
      status: HttpStatus.ACCEPTED,
      time: new Date(),
      message: 'Category updated with success',
      data: category,
    };
  }

  async destroy(categoryId: string): Promise<ICategoryMessage> {
    const category = await this.categoryRepository.show(categoryId);

    if (!category) {
      return {
        status: HttpStatus.NOT_FOUND,
        time: new Date(),
        message: 'Category not found',
        data: [],
      };
    }

    await this.categoryRepository.destroy(categoryId);

    return {
      status: HttpStatus.NO_CONTENT,
      time: new Date(),
      message: 'Category deleted with success',
      data: [],
    };
  }
}
