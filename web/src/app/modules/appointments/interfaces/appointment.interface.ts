export interface IAppointment {
  id: number;
  appointment: Appointment;
  pet: Pet;
  veterinarian: Veterinarian;
  client: Client;
}

export interface Appointment {
  date: string;
  hour: string;
  comments: string;
  status: string;
  type: string;
}

export interface Client {
  id: number;
  name: string;
  phone: string;
  email: string;
}

export interface Pet {
  id: number;
  name: string;
  breed: string;
  age: number;
  gender: string;
  weight: number;
  specie: string;
}

export interface Veterinarian {
  name: string;
  email: string;
}

export type TAppointmentList = Array<IAppointment>;
