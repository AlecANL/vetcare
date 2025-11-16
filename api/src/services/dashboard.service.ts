import { DashboardModel } from '../models/mysql/dashboard';

export class DashboardService {
  static async getStats() {
    const stats = await DashboardModel.getStats();
    return (stats ?? []) as unknown as Array<any>;
  }

  static async getIncommingAppointment() {
    const stats = await DashboardModel.getIncomingAppointments();
    return (stats ?? []) as unknown as Array<any>;
  }

  static async getProducts() {
    const stats = await DashboardModel.getProducts();
    return (stats ?? []) as unknown as Array<any>;
  }
}
