import { PaginatorTypes } from '@nodeteam/nestjs-prisma-pagination';
import { Product } from '@prisma/client';

export interface IProduct {
  id: string;
  name: string;
  description: string;
  categoryId: string;
}

export interface IProductMessage {
  status: number;
  time: Date;
  message: string;
  data: IProduct | [] | IProduct[];
}

export interface IProductListMessage {
  status: number;
  time: Date;
  message: string;
  result: PaginatorTypes.PaginatedResult<Product>;
}
