import { IHistoryRawResponse, IHistoryRequest } from '../interfaces/history.interface';
import { HistoryModel } from '../models/mysql/history';

export class HistoryService {
  static async getAll() {
    const historyRawResponse = await HistoryModel.getAll();
    const historyList = (historyRawResponse as unknown as Array<IHistoryRawResponse>) ?? [];
    return this.#_groupHistoryList(historyList);
  }

  static async create(history: IHistoryRequest) {
    const historyCreated = await HistoryModel.create(history);

    if (!historyCreated) {
      throw new Error('Error Creating History');
    }

    return historyCreated;
  }

  static #_groupHistoryList(response: Array<IHistoryRawResponse>) {
    const grouped: Array<any> = [];

    response.forEach((res) => {
      let pet = grouped.find((p) => p.pet_id === res.pet_id);

      if (!pet) {
        pet = {
          pet_id: res.pet_id,
          pet_name: res.pet_name,
          specie: res.specie,
          gender: res.gender,
          breed: res.breed,
          age: res.age,
          weight: res.weight,
          client_name: res.client_name,
          histories: [],
        };
        grouped.push(pet);
      }

      pet.histories.push({
        history_id: res.history_id,
        date: res.date,
        diagnosis: res.diagnosis,
        treatment: res.treatment,
        comments: res.comments,
      });
    });

    return grouped;
  }
}
