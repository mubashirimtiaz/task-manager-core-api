import { IsEnum, IsString, MinLength } from 'class-validator';
import { PRIORITY } from '../schema/tasks.schema';

export class CreateTaskDto {
  @IsString()
  @MinLength(3)
  title: string;

  @IsString()
  @MinLength(10)
  description: string;

  @IsEnum(PRIORITY)
  priority: string;
}
