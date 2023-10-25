import { Module } from '@nestjs/common';
import { ProxyModule } from '../common/proxy/proxy.module';
import { CategoryController } from './controllers/category.controller';

@Module({
  imports: [ProxyModule],
  controllers: [CategoryController],
})
export class CategoryModule {}
