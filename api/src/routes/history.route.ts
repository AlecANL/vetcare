import { Router } from 'express';
import { HistoryController } from '../controllers/history.controller';

export const historyRouter = Router();

historyRouter.get('/', HistoryController.getAll);
historyRouter.post('/', HistoryController.create);
