import { Pipe, PipeTransform } from '@angular/core';
import { UtilsService } from '../services/utils.service';

@Pipe({
  name: 'userRole',
})
export class UserRolePipe implements PipeTransform {
  constructor(private utils: UtilsService) {}
  transform(value: number): string {
    return this.utils.getUserRole(value);
  }
}
