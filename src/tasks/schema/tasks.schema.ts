import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export enum PRIORITY {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export type TaskDocument = HydratedDocument<Task>;

@Schema({
  timestamps: true,
  capped: {
    max: 100,
  },
})
export class Task {
  @Prop({
    required: true,
    type: String,
  })
  title: string;

  @Prop({
    required: true,
    type: String,
  })
  description: string;

  @Prop({
    required: true,
    type: String,
    enum: [PRIORITY.LOW, PRIORITY.MEDIUM, PRIORITY.HIGH],
  })
  priority: string;

  @Prop({
    type: Boolean,
    required: false,
    default: false,
  })
  archived?: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
