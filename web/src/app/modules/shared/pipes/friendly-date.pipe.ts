import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'friendlyDate',
})
export class FriendlyDatePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    const date = new Date(value);

    const months = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];

    const dia = date.getUTCDate();
    const mes = months[date.getUTCMonth()];
    const año = date.getUTCFullYear();

    return `${dia} de ${mes}, ${año}`;
  }
}
