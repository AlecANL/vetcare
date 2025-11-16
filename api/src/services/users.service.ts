import { IUserLogin } from '../interfaces/auth/auth';
import { IRawUser, TUserList } from '../interfaces/user.interface';
import { UserModel } from '../models/mysql/user';

export class UsersService {
  static async getAll(): Promise<TUserList> {
    const users = await UserModel.getAll();
    return (users ?? []) as unknown as TUserList;
  }

  static async create(user: IRawUser) {
    const userCreated = await UserModel.create(user);

    if (!userCreated) {
      throw new Error('Error creating user');
    }

    return user;
  }

  static async update(id: number, user: Partial<IRawUser>) {
    const userUpdated = await UserModel.update(id, user);

    if (!userUpdated) {
      throw new Error('Error updating user');
    }

    return user;
  }

  static async delete(id: number) {
    const userDeleted = await UserModel.delete(id);

    if (!userDeleted) {
      throw new Error('Error deleting user');
    }

    return userDeleted;
  }
}
