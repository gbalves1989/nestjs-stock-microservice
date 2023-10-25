import { ApiProperty } from '@nestjs/swagger';

export class ProductResponseDTO {
  @ApiProperty()
  readonly status: number;

  @ApiProperty()
  readonly time: Date;

  @ApiProperty()
  readonly message: string;

  @ApiProperty()
  readonly data: [];
}

export class ProductListResponseDTO {
  @ApiProperty()
  readonly status: number;

  @ApiProperty()
  readonly time: Date;

  @ApiProperty()
  readonly message: string;

  @ApiProperty()
  readonly result: [];
}
