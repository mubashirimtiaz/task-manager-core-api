import { IsOptional, IsPositive, IsString, IsIn } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  page: number = 1;

  @IsOptional()
  @IsPositive()
  limit: number = 10;

  @IsOptional()
  @IsString()
  sortBy: string = 'createdAt';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  order: 'asc' | 'desc' = 'asc';
}
