import express from 'express';
import { LoginRequest } from '../interfaces/auth/auth';
import { AuthService } from '../services/auth.service';
export class AuthController {
  static async login(req: express.Request, res: express.Response) {
    if (!req.body) {
      return res.status(400).json({ message: 'Request body is missing' });
    }

    const { email, password } = req.body as LoginRequest;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
      const user = await AuthService.findUserByEmail(email, password);
      return res.status(200).json({
        message: 'Login successful',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.rol_id,
          status: user.status,
        },
      });
    } catch (error) {
      return res.status(401).json({ message: (error as Error).message });
    }
  }
}
