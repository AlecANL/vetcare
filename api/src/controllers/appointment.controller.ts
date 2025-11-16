import express from 'express';
import { validateAppointment } from '../schemas/appointment.schema';
import { AppointmentService } from '../services/appointment.service';
import { IAppointmentRequest } from '../interfaces/appointment.interface';

export class AppointmentController {
  static async getAll(req: express.Request, res: express.Response) {
    const appointments = await AppointmentService.getAll();
    res.json(appointments);
  }

  static async create(req: express.Request, res: express.Response) {
    try {
      const appointment = validateAppointment(req.body);

      if (!appointment.success) {
        return res.json(400).json({ errors: appointment.error.issues });
      }

      const data = appointment.data as unknown as IAppointmentRequest;
      const appointmentCreated = await AppointmentService.create(data);
      res.json(appointmentCreated);
    } catch (error) {
      res.status(500).json({
        message: 'fatal error ',
      });
    }
  }
}
