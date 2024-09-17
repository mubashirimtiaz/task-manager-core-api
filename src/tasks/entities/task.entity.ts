import { PRIORITY } from '../schema/tasks.schema';

export class TaskEntity {
  title: string;
  description: string;
  priority: PRIORITY;
  archived: boolean;
  createdAt: Date;
  updatedAt: Date;
}
