import { IUserLogin } from '../interfaces/auth/auth';
import { AuthModel } from '../models/mysql/auth';

export class AuthService {
  static async findUserByEmail(email: string, password: string): Promise<IUserLogin> {
    const user = await AuthModel.findUserByEmail(email);

    if (!user) {
      throw new Error('Invalid email or password');
    }

    if (user.password !== password) {
      throw new Error('Invalid email or password');
    }

    return user;
  }
}
