import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userCreated',
})
export class UserCreatedPipe implements PipeTransform {
  transform(value: string): string {
    const d = new Date(value);

    const formatted = `${d.getDate().toString().padStart(2, '0')}/${(
      d.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}/${d.getFullYear()}`;

    return formatted;
  }
}
