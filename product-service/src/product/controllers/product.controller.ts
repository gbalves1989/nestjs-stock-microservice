import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductService } from '../services/product.service';
import { ProductMSG } from '../../constants/product.constant';
import { ProductCreateRequestDTO } from '../dtos/requests/create.request.dto';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern(ProductMSG.STORE)
  store(@Payload() productCreateRequestDTO: ProductCreateRequestDTO) {
    return this.productService.store(productCreateRequestDTO);
  }

  @MessagePattern(ProductMSG.INDEX)
  index(@Payload() page: number) {
    return this.productService.index(page);
  }

  @MessagePattern(ProductMSG.INDEX_BY_CATEGORY)
  indexByCategory(@Payload() categoryId: string) {
    return this.productService.indexByCategory(categoryId);
  }

  @MessagePattern(ProductMSG.SHOW)
  show(@Payload() id: string) {
    return this.productService.show(id);
  }

  @MessagePattern(ProductMSG.UPDATE)
  update(@Payload() payload) {
    return this.productService.update(
      payload.id,
      payload.productUpdateRequestDTO,
    );
  }

  @MessagePattern(ProductMSG.DESTROY)
  destroy(@Payload() id: string) {
    return this.productService.destroy(id);
  }
}
