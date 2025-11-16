import { getConnection } from '../../config/database';
import { IRawUser } from '../../interfaces/user.interface';

export class UserModel {
  static async getAll() {
    const connection = await getConnection();
    const [users] = await connection.query('SELECT * FROM User');
    return users;
  }

  static async create(user: IRawUser) {
    const connection = await getConnection();
    const sql = 'INSERT INTO User (name, email, password, rol_id) VALUES (?, ?, ?, ?)';
    const { name, email, password, rol_id } = user;

    const [result] = await connection.query(sql, [name, email, password, rol_id]);
    return result;
  }

  static async update(id: number, user: Partial<IRawUser>) {
    const connection = await getConnection();
    const sql = 'UPDATE user SET name = ?, email = ?, password = ?, rol_id = ? WHERE id = ?;';
    const { name, email, password, rol_id } = user;

    const [result] = await connection.query(sql, [name, email, password, rol_id, id]);
    return result;
  }

  static async delete(id: number) {
    const connection = await getConnection();
    const sql = 'UPDATE User SET status = "I" WHERE id = ?;';
    const [result] = await connection.query(sql, [id]);
    return result;
  }
}
