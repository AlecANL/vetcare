import { Router } from 'express';
import { InvoiceController } from '../controllers/invoice.controller';

export const invoiceRouter = Router();

invoiceRouter.get('/', InvoiceController.getAll);
invoiceRouter.post('/', InvoiceController.create);
