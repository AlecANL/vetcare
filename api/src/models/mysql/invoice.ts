import { ResultSetHeader } from 'mysql2';
import { getConnection } from '../../config/database';
import { IInvoiceRequest } from '../../interfaces/invoice.interface';

export class InvoiceModel {
  static async getAll() {
    const connection = await getConnection();
    const [invoiceList] = await connection.query('SELECT * FROM vw_receipt_full');
    return invoiceList ?? [];
  }

  static async create(invoice: IInvoiceRequest) {
    const connection = await getConnection();

    try {
      await connection.beginTransaction();
      const { clientId, appointmentId, products, total } = invoice;

      const receiptSql = 'INSERT INTO Receipt (client_id, appointment_id, total) VALUES (?, ?, ?)';
      const [receiptResult] = await connection.execute<ResultSetHeader>(receiptSql, [
        clientId,
        appointmentId,
        total,
      ]);
      const receiptId = receiptResult?.insertId ?? null;

      for (const product of products) {
        const { id, quantity, subTotal } = product;

        const stockSql = 'SELECT stock_actual FROM vw_inventory WHERE id = ?';
        const [stockCheck] = await connection.execute(stockSql, [id]);

        const stockCheckResponse = stockCheck as unknown as any;

        if (stockCheckResponse.length === 0) {
          throw new Error(`Product with ID ${id} not found :(`);
        }

        if (stockCheckResponse.stock_actual < quantity) {
          throw new Error('No Stock for product' + id);
        }

        const receiptDetailSql =
          'INSERT INTO Receipt_detail (receipt_id, product_id, quantity, subtotal) VALUES (?, ?, ?, ?)';
        await connection.execute(receiptDetailSql, [receiptId, id, quantity, subTotal]);

        const stockTSql =
          'INSERT INTO Stock (product_id, quantity, type_movement, comments) VALUES (?, ?, ?, ?)';

        await connection.execute(stockTSql, [id, quantity, 'salida', `Factura #${receiptId}`]);
        await connection.commit();
        return invoice;
      }
    } catch (error) {
      console.log({
        error,
      });
      await connection.rollback();
      return null;
    }
  }
}
