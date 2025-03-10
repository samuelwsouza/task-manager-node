import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/userRepository";
import { IUser } from "../models/userModel";
import { IUserService } from "../interfaces/users/service.interface";

export class UserService implements IUserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async register(userData: Partial<IUser>) {
    if (!userData.password) {
      throw new Error("Senha é obrigatória");
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(userData.password, salt);

    return this.userRepository.register({
      ...userData,
      password: hashPassword,
    });
  }

  async login(userData: { email: string; password: string }) {
    const { email, password } = userData;
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Senha incorreta");
    }

    const JWT_SECRET = process.env.JWT_SECRET || "chave-padrao-segura";
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    return token;
  }

  async findAll(options: { page?: number; limit?: number }) {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const users = await this.userRepository.findAllUsers(skip, limit);
    const total = await this.userRepository.countUsers();

    return { users, total };
  }

  async findById(userId: string) {
    const user = await this.userRepository.findUserById(userId);

    if (!userId) {
      throw new Error("Usuário não encontrado");
    }

    return user;
  }

  async update(userId: string, userData: Partial<IUser>) {
    if (userData.password) {
      const salt = await bcrypt.genSalt(10);
      userData.password = await bcrypt.hash(userData.password, salt);
    }

    const updatedUser = await this.userRepository.updateUser(userId, userData);

    if (!updatedUser) {
      throw new Error("Usuário não encontrado ou erro ao atualizar");
    }

    return updatedUser;
  }

  async delete(userId: string) {
    const deletedUser = await this.userRepository.deleteUser(userId);
  }
}
