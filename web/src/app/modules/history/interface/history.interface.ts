import { IAppointment } from '../../appointments/interfaces/appointment.interface';

export interface IHistoryResponse {
  pet_id: number;
  pet_name: string;
  specie: string;
  gender: string;
  breed: string;
  age: number;
  weight: number;
  client_name: string;
  histories: History[];
}

export interface History {
  history_id: number;
  date: Date;
  diagnosis: string;
  treatment: string;
  comments: string;
}

export type THistoryList = Array<IHistoryResponse>;

export interface ICreateHistoryRequest {
  appointment: IAppointment;
  date: string;
  diagnosis: string;
  treatment: string;
  comments: string;
}
