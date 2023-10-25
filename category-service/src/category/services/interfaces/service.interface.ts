import { CategoryCreateRequestDTO } from '../../../category/dtos/requests/create.request.dto';
import { CategoryUpdateRequestDTO } from '../../../category/dtos/requests/update.request.dto';
import {
  ICategoryMessage,
  ICategoryListMessage,
} from '../../../category/interfaces/category.interface';

export interface ICategoryService {
  store(
    categoryCreateRequestDTO: CategoryCreateRequestDTO,
  ): Promise<ICategoryMessage>;
  show(categoryId: string): Promise<ICategoryMessage>;
  index(page: number): Promise<ICategoryListMessage>;
  update(
    categoryId: string,
    categoryUpdateRequestDTO: CategoryUpdateRequestDTO,
  ): Promise<ICategoryMessage>;
  destroy(categoryId: string): Promise<ICategoryMessage>;
}
