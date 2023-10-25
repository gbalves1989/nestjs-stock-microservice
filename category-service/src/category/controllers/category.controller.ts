import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CategoryService } from '../services/category.service';
import { CategoryMSG } from '../../constants/category.constant';
import { CategoryCreateRequestDTO } from '../dtos/requests/create.request.dto';

@Controller()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @MessagePattern(CategoryMSG.STORE)
  store(@Payload() categoryCreateRequestDTO: CategoryCreateRequestDTO) {
    return this.categoryService.store(categoryCreateRequestDTO);
  }

  @MessagePattern(CategoryMSG.INDEX)
  index(@Payload() page: number) {
    return this.categoryService.index(page);
  }

  @MessagePattern(CategoryMSG.SHOW)
  show(@Payload() id: string) {
    return this.categoryService.show(id);
  }

  @MessagePattern(CategoryMSG.UPDATE)
  update(@Payload() payload) {
    return this.categoryService.update(
      payload.id,
      payload.categoryUpdateRequestDTO,
    );
  }

  @MessagePattern(CategoryMSG.DESTROY)
  destroy(@Payload() id: string) {
    return this.categoryService.destroy(id);
  }
}
