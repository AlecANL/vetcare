import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { UserRolePipe } from 'src/app/pipes/user-role.pipe';
import { UserCreatedPipe } from 'src/app/pipes/user-created.pipe';
import { ModalDeleteRegistersComponent } from './components/modal-delete-registers/modal-delete-registers.component';
import { AppointmentStatusPipe } from './pipes/appointment-status.pipe';
import { FriendlyHourPipe } from './pipes/friendly-hour.pipe';
import { FriendlyDatePipe } from './pipes/friendly-date.pipe';

@NgModule({
  declarations: [
    UserRolePipe,
    UserCreatedPipe,
    ModalDeleteRegistersComponent,
    AppointmentStatusPipe,
    FriendlyHourPipe,
    FriendlyDatePipe,
  ],
  exports: [
    UserRolePipe,
    UserCreatedPipe,
    ModalDeleteRegistersComponent,
    FriendlyDatePipe,
    FriendlyHourPipe,
  ],
  imports: [CommonModule, SharedRoutingModule],
})
export class SharedModule {}
