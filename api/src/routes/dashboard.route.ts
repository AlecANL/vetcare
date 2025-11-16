import { Router } from 'express';
import { DashBoardController } from '../controllers/dashboard.controller';

export const dashBoardRouter = Router();

dashBoardRouter.get('/stats', DashBoardController.getStats);
dashBoardRouter.get('/incomming-appointments', DashBoardController.getIncommingAppointment);
dashBoardRouter.get('/products', DashBoardController.getProducts);
