export interface IUserService {
  register(userData: {
    name: string;
    email: string;
    password: string;
  }): Promise<any>;

  login(userData: { email: string; password: string }): Promise<any>;

  findAll(options: { page?: number; limit?: number }): Promise<any>;

  findById(userId: string): Promise<any>;

  update(
    userId: string,
    userData: {
      name: string;
      email: string;
      password: string;
    }
  ): Promise<any>;

  delete(userId: string): Promise<any>;
}
