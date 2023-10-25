import { ApiProperty } from '@nestjs/swagger';

export class CategoryResponseDTO {
  @ApiProperty()
  readonly status: number;

  @ApiProperty()
  readonly time: Date;

  @ApiProperty()
  readonly message: string;

  @ApiProperty()
  readonly data: [];
}

export class CategoryListResponseDTO {
  @ApiProperty()
  readonly status: number;

  @ApiProperty()
  readonly time: Date;

  @ApiProperty()
  readonly message: string;

  @ApiProperty()
  readonly result: [];
}
