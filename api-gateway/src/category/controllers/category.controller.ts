import {
  ApiAcceptedResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import {
  CategoryListResponseDTO,
  CategoryResponseDTO,
} from '../dtos/responses/category.response.dto';
import { ExceptionResponseDTO } from '../../common/filters/dtos/http-exception.dto';
import { CategoryCreateRequestDTO } from '../dtos/requests/create.request.dto';
import { CategoryUpdateRequestDTO } from '../dtos/requests/update.request.dto';
import { ClientProxyStock } from '../../common/proxy/client.proxy';
import { CategoryMSG } from '../../common/constants/category.constant';
import { Observable } from 'rxjs';

@ApiTags('Category')
@Controller('/api/v1/category')
export class CategoryController {
  constructor(private readonly clientProxy: ClientProxyStock) {}

  private _clientProxyStock = this.clientProxy.clientProxyCategories();

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Create a new category',
    description: 'Return a new category to created',
  })
  @ApiCreatedResponse({
    description: 'Category created with success',
    type: CategoryResponseDTO,
  })
  @ApiConflictResponse({
    description: 'Category name already exists',
    type: ExceptionResponseDTO,
  })
  store(
    @Body() categoryCreateRequestDTO: CategoryCreateRequestDTO,
  ): Observable<CategoryResponseDTO> {
    return this._clientProxyStock.send(
      CategoryMSG.STORE,
      categoryCreateRequestDTO,
    );
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiQuery({
    name: 'page',
    required: true,
    type: Number,
  })
  @ApiOperation({
    summary: 'List of categories',
    description: 'Return a list of categories',
  })
  @ApiOkResponse({
    description: 'List of categories returned with success',
    type: CategoryListResponseDTO,
  })
  index(@Query('page') page: number): Observable<CategoryListResponseDTO> {
    return this._clientProxyStock.send(CategoryMSG.INDEX, page);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get category by id',
    description: 'Return some category by id',
  })
  @ApiOkResponse({
    description: 'Category returned with success',
    type: CategoryResponseDTO,
  })
  @ApiNotFoundResponse({
    description: 'Category not found',
    type: ExceptionResponseDTO,
  })
  show(@Param('id') id: string): Observable<CategoryResponseDTO> {
    return this._clientProxyStock.send(CategoryMSG.SHOW, id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Update category by id',
    description: 'Return category updated by id',
  })
  @ApiAcceptedResponse({
    description: 'Category updated with success',
    type: CategoryResponseDTO,
  })
  @ApiNotFoundResponse({
    description: 'Category not found',
    type: ExceptionResponseDTO,
  })
  @ApiConflictResponse({
    description: 'Category name already exists',
    type: ExceptionResponseDTO,
  })
  update(
    @Param('id') id: string,
    @Body() categoryUpdateRequestDTO: CategoryUpdateRequestDTO,
  ): Observable<CategoryResponseDTO> {
    return this._clientProxyStock.send(CategoryMSG.UPDATE, {
      id,
      categoryUpdateRequestDTO,
    });
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Delete some category by id',
    description: 'Return some category by id',
  })
  @ApiNoContentResponse({
    description: 'Category deleted with success',
  })
  @ApiNotFoundResponse({
    description: 'Category not found',
    type: ExceptionResponseDTO,
  })
  destroy(@Param('id') id: string): Observable<CategoryResponseDTO> {
    return this._clientProxyStock.send(CategoryMSG.DESTROY, id);
  }
}
