import { getConnection } from '../../config/database';

export class DashboardModel {
  static async getStats() {
    const connection = await getConnection();
    const [stats] = await connection.query('SELECT * FROM vw_dashboard_stats');
    return stats;
  }

  static async getIncomingAppointments() {
    const connection = await getConnection();
    const [stats] = await connection.query('SELECT * FROM vw_incomming_appointment');
    return stats;
  }

  static async getProducts() {
    const connection = await getConnection();
    const [stats] = await connection.query('SELECT * FROM vw_productos_alerta');
    return stats;
  }
}
