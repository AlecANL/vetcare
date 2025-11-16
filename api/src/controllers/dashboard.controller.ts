import express from 'express';
import { DashboardService } from '../services/dashboard.service';

export class DashBoardController {
  static async getStats(req: express.Request, res: express.Response) {
    const users = await DashboardService.getStats();
    res.json(users);
  }

  static async getIncommingAppointment(req: express.Request, res: express.Response) {
    const users = await DashboardService.getIncommingAppointment();
    res.json(users);
  }

  static async getProducts(req: express.Request, res: express.Response) {
    const users = await DashboardService.getProducts();
    res.json(users);
  }
}
