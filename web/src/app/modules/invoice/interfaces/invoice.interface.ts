export interface IInvoice {
  receipt_id: number;
  receipt_date: string;
  receipt_total: string;
  client_id: number;
  client_name: string;
  client_phone: string;
  client_email: string;
  client_address: string;
  appointment_id: number;
  appointment_date: string;
  appointment_hour: string;
  appointment_comments: string;
  appointment_status: string;
  pet_id: number;
  veterinarian_id: number;
  reason_id: number;
  detail_id: number;
  product_id: number;
  quantity: number;
  subtotal: string;
  product_name: string;
  product_type: string;
  product_price: string;
}
