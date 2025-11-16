import { getConnection } from '../../config/database';

export class AuthModel {
  static async findUserByEmail(email: string) {
    const connection = await getConnection();
    const sql = 'SELECT * FROM User WHERE email = ?';

    const [rows] = (await connection.query(sql, [email])) as Array<any>;
    return rows.length > 0 ? rows[0] : null;
  }
}
