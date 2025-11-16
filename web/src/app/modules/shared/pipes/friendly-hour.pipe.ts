import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'friendlyHour',
})
export class FriendlyHourPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    const [hourStr, minuteStr] = value.split(':');
    let hour = Number(hourStr);
    const minutes = Number(minuteStr);

    const ampm = hour >= 12 ? 'PM' : 'AM';

    hour = hour % 12;
    if (hour === 0) hour = 12;

    const h = hour.toString().padStart(2, '0');
    const m = minutes.toString().padStart(2, '0');

    return `${h}:${m} ${ampm}`;
  }
}
