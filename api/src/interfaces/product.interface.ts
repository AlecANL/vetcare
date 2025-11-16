export interface IProductRequest {
  name: string;
  type: string;
  price: number;
  stock: number;
  minStock: number;
}

export interface IStockRequest {
  productId: number;
  quantity: number;
  type_movement: string;
  comments: string;
}
