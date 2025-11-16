import { getConnection } from '../../config/database';
import { IProductRequest, IStockRequest } from '../../interfaces/product.interface';

export class ProductModel {
  static async getAll() {
    const connection = await getConnection();
    const [appointments] = await connection.query('SELECT * FROM vw_inventory');
    return appointments ?? [];
  }

  static async create(product: IProductRequest) {
    const connection = await getConnection();
    const sql = 'INSERT INTO Products (name, type, price, stock, stock_min) VALUES (?, ?, ?, ?, ?)';
    const { name, type, stock, price, minStock } = product;

    const [result] = await connection.query(sql, [name, type, price, stock, minStock]);
    return result;
  }

  static async addToStock(stock: IStockRequest) {
    const connection = await getConnection();
    const sql =
      'INSERT INTO Stock (product_id, quantity, type_movement, comments) VALUES (?, ?, ?, ?)';
    const { productId, quantity, type_movement, comments } = stock;

    const [result] = await connection.query(sql, [productId, quantity, type_movement, comments]);
    return result;
  }
}
