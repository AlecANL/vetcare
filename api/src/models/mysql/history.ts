import { getConnection } from '../../config/database';
import { IHistoryRequest } from '../../interfaces/history.interface';

export class HistoryModel {
  static async getAll() {
    const connection = await getConnection();
    const [history] = await connection.query(
      'SELECT * FROM v_clinical_history ORDER BY pet_id, date DESC'
    );

    return history ?? [];
  }

  static async create(historyRequest: IHistoryRequest) {
    const connection = await getConnection();

    const { pet_id, date, diagnosis, treatment, comments } = historyRequest;

    const historySql =
      'INSERT INTO Clinical_history (pet_id, date, diagnosis, treatment, comments) VALUES (?, ?, ?, ?, ?)';

    await connection.query(historySql, [pet_id, date, diagnosis, treatment, comments]);
    return historyRequest;
  }
}
