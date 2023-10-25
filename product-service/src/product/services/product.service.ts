import { HttpStatus, Injectable } from '@nestjs/common';
import { IProductService } from './interfaces/service.interface';
import { ProductCreateRequestDTO } from '../dtos/requests/create.request.dto';
import { ProductUpdateRequestDTO } from '../dtos/requests/update.request.dto';
import {
  IProduct,
  IProductListMessage,
  IProductMessage,
} from '../interfaces/product.interface';
import { ProductRepository } from '../repositories/product.repository';

@Injectable()
export class ProductService implements IProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async store(
    productCreateRequestDTO: ProductCreateRequestDTO,
  ): Promise<IProductMessage> {
    const productNameExists: IProduct = await this.productRepository.showName(
      productCreateRequestDTO.name,
    );

    if (productNameExists) {
      return {
        status: HttpStatus.CONFLICT,
        time: new Date(),
        message: 'Product name already exists',
        data: [],
      };
    }

    const product = await this.productRepository.store(productCreateRequestDTO);

    return {
      status: HttpStatus.CREATED,
      time: new Date(),
      message: 'Product created with success',
      data: product,
    };
  }

  async show(productId: string): Promise<IProductMessage> {
    const product: IProduct = await this.productRepository.show(productId);

    if (!product) {
      return {
        status: HttpStatus.NOT_FOUND,
        time: new Date(),
        message: 'Product not found',
        data: [],
      };
    }

    return {
      status: HttpStatus.OK,
      time: new Date(),
      message: 'Product returned with success',
      data: product,
    };
  }

  async index(page: number): Promise<IProductListMessage> {
    const products = await this.productRepository.index({ page });

    return {
      status: HttpStatus.OK,
      time: new Date(),
      message: 'List of products returned with success',
      result: products,
    };
  }

  async indexByCategory(categoryId: string): Promise<IProductMessage> {
    const products = await this.productRepository.indexByCategory(categoryId);

    return {
      status: HttpStatus.OK,
      time: new Date(),
      message: 'List of products returned with success',
      data: products,
    };
  }

  async update(
    productId: string,
    productUpdateRequestDTO: ProductUpdateRequestDTO,
  ): Promise<IProductMessage> {
    const productExists: IProduct =
      await this.productRepository.show(productId);

    if (!productExists) {
      return {
        status: HttpStatus.NOT_FOUND,
        time: new Date(),
        message: 'Product not found',
        data: [],
      };
    }

    const productNameExists: IProduct = await this.productRepository.showName(
      productUpdateRequestDTO.name,
    );

    if (productNameExists) {
      return {
        status: HttpStatus.CONFLICT,
        time: new Date(),
        message: 'Product name already exists',
        data: [],
      };
    }

    const product = await this.productRepository.update(
      productId,
      productUpdateRequestDTO,
    );

    return {
      status: HttpStatus.ACCEPTED,
      time: new Date(),
      message: 'Product updated with success',
      data: product,
    };
  }

  async destroy(productId: string): Promise<IProductMessage> {
    const product = await this.productRepository.show(productId);

    if (!product) {
      return {
        status: HttpStatus.NOT_FOUND,
        time: new Date(),
        message: 'Product not found',
        data: [],
      };
    }

    await this.productRepository.destroy(productId);

    return {
      status: HttpStatus.NO_CONTENT,
      time: new Date(),
      message: 'Product deleted with success',
      data: [],
    };
  }
}
