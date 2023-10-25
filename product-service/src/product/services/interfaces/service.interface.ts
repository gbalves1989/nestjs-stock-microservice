import { ProductCreateRequestDTO } from '../../../product/dtos/requests/create.request.dto';
import { ProductUpdateRequestDTO } from '../../../product/dtos/requests/update.request.dto';
import {
  IProductMessage,
  IProductListMessage,
} from '../../../product/interfaces/product.interface';

export interface IProductService {
  store(
    productCreateRequestDTO: ProductCreateRequestDTO,
  ): Promise<IProductMessage>;
  show(productId: string): Promise<IProductMessage>;
  index(page: number): Promise<IProductListMessage>;
  indexByCategory(categoryId: string): Promise<IProductMessage>;
  update(
    productId: string,
    productUpdateRequestDTO: ProductUpdateRequestDTO,
  ): Promise<IProductMessage>;
  destroy(productId: string): Promise<IProductMessage>;
}
