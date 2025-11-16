import express from 'express';
import { HistoryService } from '../services/history.service';
import { validateHistory } from '../schemas/history.schema';
import { IHistoryRequest } from '../interfaces/history.interface';
export class HistoryController {
  static async getAll(req: express.Request, res: express.Response) {
    const history = await HistoryService.getAll();
    res.json(history);
  }

  static async create(req: express.Request, res: express.Response) {
    try {
      const history = validateHistory(req.body);

      if (!history.success) {
        return res.json(400).json({ errors: history.error.issues });
      }

      const data = history.data as unknown as IHistoryRequest;
      const appointmentCreated = await HistoryService.create(data);
      res.json(appointmentCreated);
    } catch (error) {
      res.status(500).json({
        message: 'fatal error ',
      });
    }
  }
}
