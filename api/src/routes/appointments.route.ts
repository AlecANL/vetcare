import { Router } from 'express';
import { AppointmentController } from '../controllers/appointment.controller';

export const appointmentRouter = Router();

appointmentRouter.get('/', AppointmentController.getAll);
appointmentRouter.post('/', AppointmentController.create);
