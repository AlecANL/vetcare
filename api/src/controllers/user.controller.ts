import express from 'express';
import { UsersService } from '../services/users.service';
import { validateUser } from '../schemas/user.schema';

export class UserController {
  static async getAll(req: express.Request, res: express.Response) {
    const users = await UsersService.getAll();
    res.json(users);
  }

  static async create(req: express.Request, res: express.Response) {
    const user = validateUser(req.body);
    if (!user.success) {
      return res.status(400).json({ errors: user.error.issues });
    }

    const newUser = await UsersService.create(user.data);
    res.json(newUser);
  }

  static async update(req: express.Request, res: express.Response) {
    const user = validateUser(req.body);

    if (!user.success) {
      return res.status(400).json({ errors: user.error.message });
    }

    const { id } = req.params;

    const updatedUser = await UsersService.update(Number(id), user.data);
    res.json(updatedUser);
  }

  static async delete(req: express.Request, res: express.Response) {
    const { id } = req.params;

    await UsersService.delete(Number(id));

    res.json({
      message: 'User deleted',
    });
  }
}
