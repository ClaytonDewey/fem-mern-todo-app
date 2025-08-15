import mongoose from 'mongoose';

export interface TaskDocument extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  task: string;
  completed: boolean;
  order: number;
}

const taskSchema = new mongoose.Schema<TaskDocument>(
  {
    userId: {
      ref: 'User',
      type: mongoose.Schema.Types.ObjectId,
      index: true,
    },
    task: { type: String, required: true },
    completed: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const TaskModel = mongoose.model<TaskDocument>('Task', taskSchema);
export default TaskModel;
