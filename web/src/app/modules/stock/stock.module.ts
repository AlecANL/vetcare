import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockRoutingModule } from './stock-routing.module';
import { StockHomeComponent } from './components/stock-home/stock-home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { StockFormComponent } from './components/stock-form/stock-form.component';
import { StockAddFormComponent } from './components/stock-add-form/stock-add-form.component';

@NgModule({
  declarations: [StockHomeComponent, StockFormComponent, StockAddFormComponent],
  imports: [
    CommonModule,
    StockRoutingModule,
    SharedModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class StockModule {}
