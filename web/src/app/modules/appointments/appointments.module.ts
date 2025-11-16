import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentsRoutingModule } from './appointments-routing.module';
import { AppointmentHomeComponent } from './components/appointment-home/appointment-home.component';
import { AppointmentFormComponent } from './components/appointment-form/appointment-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { AppointmentDetailComponent } from './components/appointment-detail/appointment-detail.component';
import { AppointmentInvoiceComponent } from './components/appointment-invoice/appointment-invoice.component';

@NgModule({
  declarations: [AppointmentHomeComponent, AppointmentFormComponent, AppointmentDetailComponent, AppointmentInvoiceComponent],
  imports: [
    CommonModule,
    AppointmentsRoutingModule,
    HttpClientModule,
    SharedModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class AppointmentsModule {}
