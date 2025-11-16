export interface IStock {
  id: number;
  name: string;
  type: string;
  price: string;
  stock_min: number;
  stock_actual: string;
}

export type TStockList = Array<IStock>;
