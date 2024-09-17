import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './schema/tasks.schema';
import { TaskRepository } from './repository/task.repository';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Task.name,
        schema: TaskSchema,
      },
    ]),
  ],
  controllers: [TasksController],
  providers: [TasksService, TaskRepository],
})
export class TasksModule {}
