import { IUserRepository } from "../interfaces/users/repository.interface";
import { IUser } from "../models/userModel";
import UserModel from "../models/userModel";

export class UserRepository implements IUserRepository {
  async register(userData: Partial<IUser>) {
    const user = new UserModel(userData);
    return user.save();
  }

  async findUserByEmail(email: string) {
    return UserModel.findOne({ email });
  }

  async findAllUsers(skip: number, limit: number): Promise<IUser[]> {
    return await UserModel.find().skip(skip).limit(limit);
  }

  async findUserById(userId: string): Promise<IUser | null> {
    return await UserModel.findById(userId);
  }

  async countUsers(): Promise<number> {
    return await UserModel.countDocuments();
  }

  async updateUser(
    userId: string,
    userData: Partial<IUser>
  ): Promise<IUser | null> {
    return await UserModel.findByIdAndUpdate(userId, userData, { new: true });
  }

  async deleteUser(userId: string): Promise<IUser | null> {
    return await UserModel.findByIdAndDelete(userId);
  }
}
