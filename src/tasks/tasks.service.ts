import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRepository } from './repository/task.repository';
import { PaginationQueryDto } from './dto/paginate-task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly tasks: TaskRepository) {}

  create(createTaskDto: CreateTaskDto) {
    return this.tasks.create(createTaskDto);
  }

  findAll(query: PaginationQueryDto) {
    return this.tasks.getAll(query);
  }

  async findOne(id: string) {
    try {
      const task = await this.tasks.get(id);

      if (!task) {
        throw new NotFoundException('Task not found');
      }
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
}

const Exception = (error: unknown) => {
  if (error instanceof Error) {
    return new Error(error.message);
  }
  return new Error('An unknown error occurred');
};
