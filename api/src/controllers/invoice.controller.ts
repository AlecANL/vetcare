import express from 'express';
import { InvoiceService } from '../services/invoice.service';
import { IInvoiceRequest } from '../interfaces/invoice.interface';

export class InvoiceController {
  static async getAll(req: express.Request, res: express.Response) {
    const appointments = await InvoiceService.getAll();
    res.json(appointments);
  }

  static async create(req: express.Request, res: express.Response) {
    try {
      const invoice = req.body;
      const data = invoice as unknown as IInvoiceRequest;

      const appointmentCreated = await InvoiceService.create(data);
      res.json(appointmentCreated);
    } catch (error) {
      res.status(500).json({
        message: 'fatal error ',
      });
    }
  }
}
