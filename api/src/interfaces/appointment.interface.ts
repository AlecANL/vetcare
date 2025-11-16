export interface IAppointmentRequest {
  userId: number;
  client: {
    name: string;
    phone: string;
    email: string;
    address: string;
  };
  pet: {
    name: string;
    specie: number;
    breed: string;
    age: number;
    gender: number;
    weight: number;
  };
  appointment: {
    date: string;
    hour: string;
    type: number;
    comments: string;
  };
}

export interface IAppointmentRawResponse {
  appointment_id: number;
  appointment_date: Date;
  appointment_hour: string;
  appointment_comments: string;
  appointment_status: string;
  reason_name: string;
  pet_id: number;
  pet_name: string;
  pet_breed: string;
  pet_age: number;
  pet_weight: number;
  specie_name: string;
  gender_name: string;
  client_name: string;
  client_phone: string;
  client_email: string;
  client_id: number;
  veterinarian_name: string;
  veterinarian_email: string;
}
