import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceHomeComponent } from './components/invoice-home/invoice-home.component';
import { InvoiceDetailComponent } from './components/invoice-detail/invoice-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [InvoiceHomeComponent, InvoiceDetailComponent],
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    SharedModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class InvoiceModule {}
