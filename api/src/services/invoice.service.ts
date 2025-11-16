import { IInvoiceRequest } from '../interfaces/invoice.interface';
import { InvoiceModel } from '../models/mysql/invoice';

export class InvoiceService {
  static async getAll() {
    const invoiceRawResponse = await InvoiceModel.getAll();
    const appointmentList = (invoiceRawResponse as unknown as Array<any>) ?? [];
    return appointmentList;
  }

  static async create(invoice: IInvoiceRequest) {
    const invoiceCreated = await InvoiceModel.create(invoice);

    if (!invoiceCreated) {
      throw new Error('Error creating invoice');
    }

    return invoiceCreated;
  }
}
