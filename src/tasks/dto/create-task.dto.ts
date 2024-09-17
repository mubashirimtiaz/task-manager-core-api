import { IsEnum, IsString, MinLength } from 'class-validator';
import { PRIORITY } from '../schema/tasks.schema';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  title: string;

  @ApiProperty()
  @IsString()
  @MinLength(10)
  description: string;

  @ApiProperty()
  @IsEnum(PRIORITY)
  priority: string;
}
