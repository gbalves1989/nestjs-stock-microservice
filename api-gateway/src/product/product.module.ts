import { Module } from '@nestjs/common';
import { ProxyModule } from '../common/proxy/proxy.module';
import { ProductController } from './controllers/product.controller';

@Module({
  imports: [ProxyModule],
  controllers: [ProductController],
})
export class ProductModule {}
