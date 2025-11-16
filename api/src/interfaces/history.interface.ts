export interface IHistoryRequest {
  pet_id: number;
  date: string;
  diagnosis: string;
  treatment: string;
  comments: string;
}

export interface IHistoryRawResponse {
  history_id: number;
  date: string;
  diagnosis: string;
  treatment: string;
  comments: string;
  pet_id: number;
  pet_name: string;
  breed: string;
  age: number;
  weight: number;
  status: string;
  specie: string;
  gender: string;
  client_id: number;
  client_name: string;
  client_phone: string;
  client_email: string;
}
