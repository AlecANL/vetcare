import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';

export const productRouter = Router();

productRouter.get('/', ProductController.getAll);
productRouter.post('/', ProductController.create);
productRouter.post('/:id', ProductController.addToStock);
