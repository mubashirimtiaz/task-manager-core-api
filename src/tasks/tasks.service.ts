import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRepository } from './repository/task.repository';
import { PaginationQueryDto } from './dto/paginate-task.dto';
import { Exception } from 'src/utils/exception.util';
import { FilterOptions, FilterQueryOptions } from './types/query-option.type';

@Injectable()
export class TasksService {
  constructor(private readonly tasks: TaskRepository) {}

  create(createTaskDto: CreateTaskDto) {
    return this.tasks.create(createTaskDto);
  }

  findAllActive(query: PaginationQueryDto) {
    const filter: FilterOptions = { archived: false };
    return this.findAll({ filter, query });
  }

  findAllArchived(query: PaginationQueryDto) {
    const filter: FilterOptions = { archived: true };
    return this.findAll({ filter, query });
  }

  async findOne(id: string) {
    try {
      const task = await this.tasks.get(id);

      if (!task) {
        throw new NotFoundException('Task not found');
      }
      return task;
    } catch (error: unknown) {
      throw Exception(error);
    }
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    try {
      const task = await this.tasks.update(id, updateTaskDto);

      if (!task) {
        throw new NotFoundException('Task not found');
      }

      return task;
    } catch (error: unknown) {
      throw Exception(error);
    }
  }

  async remove(id: string) {
    try {
      const task = await this.tasks.delete(id);

      if (!task) {
        throw new NotFoundException('Task not found');
      }

      return task;
    } catch (error: unknown) {
      throw Exception(error);
    }
  }

  private async findAll(options: FilterQueryOptions) {
    try {
      const tasksPromise = this.tasks.getAll(options);
      const countPromise = this.tasks.count(options.filter);
      const [tasks, total] = await Promise.all([tasksPromise, countPromise]);
      return { tasks, total };
    } catch (error) {
      throw Exception(error);
    }
  }
}
