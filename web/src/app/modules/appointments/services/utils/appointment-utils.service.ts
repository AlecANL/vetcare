import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppointmentUtilsService {
  getGender(id: number) {
    const mapped: Record<number, string> = {
      1: 'Macho',
      2: 'Hembra',
    };

    return mapped[id] || 'Macho';
  }

  getSpecie(id: number) {
    const mapped: Record<number, string> = {
      1: 'Perro',
      2: 'Gato',
      3: 'Ave',
      4: 'Roedor',
      5: 'Reptil',
      6: 'Otro',
    };

    return mapped[id] || '';
  }

  getReason(id: number) {
    const mapped: Record<number, string> = {
      1: 'Consulta General',
      2: 'Cirugía',
      3: 'Vacunación',
      4: 'Emergencia',
      5: 'Seguimiento',
      6: 'Estética',
    };

    return mapped[id] || '';
  }
}
