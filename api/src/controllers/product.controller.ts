import express from 'express';
import { ProductService } from '../services/product.service';
import { validateProduct, validateStock } from '../schemas/product.schema';

export class ProductController {
  static async getAll(req: express.Request, res: express.Response) {
    const products = await ProductService.getAll();
    res.json(products);
  }

  static async create(req: express.Request, res: express.Response) {
    try {
      const product = validateProduct(req.body);

      if (!product.success) {
        res.status(400).json({
          message: product.error.format(),
        });
        return;
      }

      const data = product.data as unknown as any;
      const productCreated = await ProductService.create(data);
      res.json(productCreated);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'fatal error',
      });
    }
  }

  static async addToStock(req: express.Request, res: express.Response) {
    try {
      const product = validateStock(req.body);

      if (!product.success) {
        return res.json(400).json({ errors: product.error?.issues ?? product?.error?.message });
      }

      const data = product.data as unknown as any;
      const productCreated = await ProductService.addToStock(data);
      res.json(productCreated);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'fatal error',
      });
    }
  }
}
