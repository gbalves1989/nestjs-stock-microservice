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
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ExceptionResponseDTO } from '../../common/filters/dtos/http-exception.dto';
import { ClientProxyStock } from '../../common/proxy/client.proxy';
import { Observable } from 'rxjs';
import {
  ProductListResponseDTO,
  ProductResponseDTO,
} from '../dtos/responses/product.response.dto';
import { ProductCreateRequestDTO } from '../dtos/requests/create.request.dto';
import { ProductMSG } from '../../common/constants/product.constant';
import { ProductUpdateRequestDTO } from '../dtos/requests/update.request.dto';

@ApiTags('Product')
@Controller('/api/v1/product')
export class ProductController {
  constructor(private readonly clientProxy: ClientProxyStock) {}

  private _clientProxyStock = this.clientProxy.clientProxyProducts();

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({
    summary: 'Create a new product',
    description: 'Return a new product to created',
  })
  @ApiCreatedResponse({
    description: 'Product created with success',
    type: ProductResponseDTO,
  })
  @ApiConflictResponse({
    description: 'Product name already exists',
    type: ExceptionResponseDTO,
  })
  @ApiNotFoundResponse({
    description: 'Category not found',
    type: ExceptionResponseDTO,
  })
  store(
    @Body() productCreateRequestDTO: ProductCreateRequestDTO,
  ): Observable<ProductResponseDTO> {
    return this._clientProxyStock.send(
      ProductMSG.STORE,
      productCreateRequestDTO,
    );
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiQuery({
    name: 'page',
    required: true,
    type: Number,
  })
  @ApiOperation({
    summary: 'List of products',
    description: 'Return a list of products',
  })
  @ApiOkResponse({
    description: 'List of products returned with success',
    type: ProductListResponseDTO,
  })
  index(@Query('page') page: number): Observable<ProductListResponseDTO> {
    return this._clientProxyStock.send(ProductMSG.INDEX, page);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('category/:id')
  @ApiOperation({
    summary: 'List of products by category',
    description: 'Return a list of products by category',
  })
  @ApiOkResponse({
    description: 'List of products by category returned with success',
    type: ProductResponseDTO,
  })
  indexByCategory(
    @Param('id') categoryId: string,
  ): Observable<ProductResponseDTO> {
    return this._clientProxyStock.send(
      ProductMSG.INDEX_BY_CATEGORY,
      categoryId,
    );
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({
    summary: 'Get product by id',
    description: 'Return some product by id',
  })
  @ApiOkResponse({
    description: 'Product returned with success',
    type: ProductResponseDTO,
  })
  @ApiNotFoundResponse({
    description: 'Product not found',
    type: ExceptionResponseDTO,
  })
  show(@Param('id') id: string): Observable<ProductResponseDTO> {
    return this._clientProxyStock.send(ProductMSG.SHOW, id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiOperation({
    summary: 'Update product by id',
    description: 'Return product updated by id',
  })
  @ApiAcceptedResponse({
    description: 'Product updated with success',
    type: ProductResponseDTO,
  })
  @ApiNotFoundResponse({
    description: 'Product not found',
    type: ExceptionResponseDTO,
  })
  @ApiConflictResponse({
    description: 'Product name already exists',
    type: ExceptionResponseDTO,
  })
  update(
    @Param('id') id: string,
    @Body() productUpdateRequestDTO: ProductUpdateRequestDTO,
  ): Observable<ProductResponseDTO> {
    return this._clientProxyStock.send(ProductMSG.UPDATE, {
      id,
      productUpdateRequestDTO,
    });
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete some product by id',
    description: 'Return some product by id',
  })
  @ApiNoContentResponse({
    description: 'Product deleted with success',
  })
  @ApiNotFoundResponse({
    description: 'Product not found',
    type: ExceptionResponseDTO,
  })
  destroy(@Param('id') id: string): Observable<ProductResponseDTO> {
    return this._clientProxyStock.send(ProductMSG.DESTROY, id);
  }
}
