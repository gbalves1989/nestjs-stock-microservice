import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ProductService } from './services/product.service';
import { ProductRepository } from './repositories/product.repository';
import { ProductController } from './controllers/product.controller';

@Module({
  imports: [DatabaseModule],
  providers: [ProductService, ProductRepository],
  controllers: [ProductController],
})
export class ProductModule {}
