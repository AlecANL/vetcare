export interface IInvoiceRequest {
  clientId: number;
  appointmentId: number;
  total: number;
  products: IInvoiceProduct[];
}

export interface IInvoiceProduct {
  id: number;
  quantity: number;
  subTotal: number;
}
