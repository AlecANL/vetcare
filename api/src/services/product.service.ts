import { IProductRequest, IStockRequest } from '../interfaces/product.interface';
import { ProductModel } from '../models/mysql/products';

export class ProductService {
  static async getAll() {
    const products = await ProductModel.getAll();
    return (products ?? []) as unknown as Array<any>;
  }

  static async create(product: IProductRequest) {
    const userCreated = (await ProductModel.create(product)) as unknown as any;

    if (!userCreated) {
      throw new Error('Error creating product');
    }
    const productId = userCreated?.insertId ?? null;
    return {
      ...product,
      id: productId,
    };
  }

  static async addToStock(product: IStockRequest) {
    const userCreated = await ProductModel.addToStock(product);

    if (!userCreated) {
      throw new Error('Error creating product');
    }

    return product;
  }
}
