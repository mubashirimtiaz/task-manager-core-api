import { InjectModel } from '@nestjs/mongoose';
import { IGenericRepository } from 'src/common/repositories/generic.repository';
import { Task, TaskDocument } from '../schema/tasks.schema';
import { Model } from 'mongoose';
import { FilterOptions, FilterQueryOptions } from '../types/query-option.type';

export class TaskRepository implements IGenericRepository<Task> {
  constructor(
    @InjectModel(Task.name)
    private readonly _repository: Model<TaskDocument>,
  ) {}
  getAll(options: FilterQueryOptions = {}) {
    const { filter = {}, query = {} } = options;

    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      order = 'desc',
    } = query;

    const skip = (page - 1) * limit;
    const sortOrder = order === 'asc' ? 1 : -1;

    return this._repository
      .find(filter)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit)
      .exec();
  }

  get(id: string): Promise<Task> {
    return this._repository.findById(id).exec();
  }

  create(item: Task): Promise<Task> {
    return this._repository.create(item);
  }

  update(id: string, item: Partial<Task>) {
    return this._repository
      .findByIdAndUpdate(id, item, {
        new: true,
      })
      .exec();
  }

  delete(id: string) {
    return this._repository.findByIdAndDelete(id).exec();
  }

  count(filter: FilterOptions = {}): Promise<number> {
    return this._repository.countDocuments(filter).exec();
  }
}
