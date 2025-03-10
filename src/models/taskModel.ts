import mongoose, { Schema } from "mongoose";

export interface ITask {
  title: string;
  description: string;
  status: "pending" | "completed" | "canceled";
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "completed", "canceled"],
      default: "pending",
    },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

export const TaskModel = mongoose.model<ITask>("Task", TaskSchema);
