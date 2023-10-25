import { PaginatorTypes } from '@nodeteam/nestjs-prisma-pagination';
import { Product } from '@prisma/client';
import { ProductCreateRequestDTO } from '../../../product/dtos/requests/create.request.dto';
import { IProduct } from '../../../product/interfaces/product.interface';
import { ProductUpdateRequestDTO } from '../../../product/dtos/requests/update.request.dto';

export interface IProductRepository {
  store(productCreateRequestDTO: ProductCreateRequestDTO): Promise<IProduct>;
  show(productId: string): Promise<IProduct>;
  showName(name: string): Promise<IProduct>;
  index({
    page,
  }: {
    page?: number;
  }): Promise<PaginatorTypes.PaginatedResult<Product>>;
  indexByCategory(categoryId: string): Promise<IProduct[]>;
  update(
    productId: string,
    productUpdateRequestDTO: ProductUpdateRequestDTO,
  ): Promise<IProduct>;
  destroy(productId: string): Promise<void>;
}
