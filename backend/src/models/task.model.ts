import mongoose from 'mongoose';

export interface TaskDocument extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  task: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
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
    createdAt: {
      type: Date,
      required: true,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

const TaskModel = mongoose.model<TaskDocument>('Task', taskSchema);
export default TaskModel;
