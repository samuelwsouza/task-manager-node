import mongoose, { Schema } from "mongoose";

export interface IUser {
  email: string;
  name: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
});

export default mongoose.model<IUser>("User", UserSchema);
