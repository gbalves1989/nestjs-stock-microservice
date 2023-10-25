import { PaginatorTypes } from '@nodeteam/nestjs-prisma-pagination';
import { Category } from '@prisma/client';

export interface ICategory {
  id: string;
  name: string;
}

export interface ICategoryMessage {
  status: number;
  time: Date;
  message: string;
  data: ICategory | [];
}

export interface ICategoryListMessage {
  status: number;
  time: Date;
  message: string;
  result: PaginatorTypes.PaginatedResult<Category>;
}
