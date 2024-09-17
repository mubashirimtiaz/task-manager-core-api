import { InjectModel } from '@nestjs/mongoose';
import { IGenericRepository } from 'src/common/repositories/generic.repository';
import { Task, TaskDocument } from '../schema/tasks.schema';
import { Model } from 'mongoose';
import { PaginationQueryDto } from '../dto/paginate-task.dto';

export class TaskRepository implements IGenericRepository<Task> {
  constructor(
    @InjectModel(Task.name)
    private readonly _repository: Model<TaskDocument>,
  ) {}
  getAll(query: PaginationQueryDto): Promise<Task[]> {
    const { page, limit, sortBy, order } = query;

    const skip = (page - 1) * limit;
    const sortOrder = order === 'asc' ? 1 : -1;

    return this._repository
      .find()
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit)
      .exec();
  }

  get(id: string): Promise<Task> {
    return this._repository.findById(id);
  }

  create(item: Task): Promise<Task> {
    return this._repository.create(item);
  }

  update(id: string, item: Partial<Task>) {
    return this._repository.findByIdAndUpdate(id, item, {
      new: true,
    });
  }

  delete(id: string) {
    return this._repository.findByIdAndDelete(id);
  }
}
