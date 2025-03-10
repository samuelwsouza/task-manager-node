import { IUser } from "../../models/userModel";

export interface IUserRepository {
  register(userData: Partial<IUser>): Promise<IUser>;

  findUserByEmail(email: string): Promise<IUser | null>;

  findAllUsers(skip: number, limit: number): Promise<IUser[]>;

  findUserById(userId: string): Promise<IUser | null>;

  countUsers(): Promise<number>;

  updateUser(userId: string, userData: Partial<IUser>): Promise<IUser | null>;

  deleteUser(userId: string): Promise<IUser | null>;
}
