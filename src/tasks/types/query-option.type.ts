import { PaginationQueryDto } from '../dto/paginate-task.dto';
import { Task } from '../schema/tasks.schema';

type TaskKeys = keyof Task;

export type FilterOptions = {
  [key in TaskKeys]?: any;
};

export type FilterQueryOptions = {
  filter?: FilterOptions;
  query?: PaginationQueryDto;
};
