import { IAppointmentRawResponse, IAppointmentRequest } from '../interfaces/appointment.interface';
import { AppointmentModel } from '../models/mysql/appointment';

export class AppointmentService {
  static async getAll() {
    const appointmentRawResponse = await AppointmentModel.getAll();
    const appointmentList =
      (appointmentRawResponse as unknown as Array<IAppointmentRawResponse>) ?? [];

    return appointmentList.map((appointment) => {
      return {
        id: appointment.appointment_id,
        appointment: {
          date: appointment.appointment_date,
          hour: appointment.appointment_hour,
          comments: appointment.appointment_comments,
          status: appointment.appointment_status,
          type: appointment.reason_name,
        },
        pet: {
          id: appointment.pet_id,
          name: appointment.pet_name,
          breed: appointment.pet_breed,
          age: appointment.pet_age,
          gender: appointment.gender_name,
          weight: appointment.pet_weight,
          specie: appointment.specie_name,
        },
        veterinarian: {
          name: appointment.veterinarian_name,
          email: appointment.veterinarian_email,
        },
        client: {
          id: appointment?.client_id,
          name: appointment.client_name,
          phone: appointment.client_phone,
          email: appointment.client_email,
        },
      };
    });
  }

  static async create(appointment: IAppointmentRequest) {
    const appointmentCreated = await AppointmentModel.create(appointment);

    if (!appointmentCreated) {
      throw new Error('Error creating appointment');
    }

    return appointmentCreated;
  }
}
