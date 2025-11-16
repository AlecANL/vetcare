import z from 'zod';

const productSchema = z.object({
  name: z.string().nonempty('name is required'),
  type: z.string().nonempty('type is required'),
  price: z.number().positive('price is required'),
  stock: z.int().positive('stock is required'),
  minStock: z.int().positive('minStock is required'),
});

const stockSchema = z.object({
  productId: z.int().positive('price is required'),
  quantity: z.int().positive('stock is required'),
  type_movement: z.string().nonempty('type is required'),
  comments: z.string().nonempty('type is required'),
});

export function validateProduct(data: any) {
  return productSchema.safeParse(data);
}

export function validateStock(data: any) {
  return stockSchema.safeParse(data);
}
