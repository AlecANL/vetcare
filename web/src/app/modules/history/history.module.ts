import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryRoutingModule } from './history-routing.module';
import { HistoryHomeComponent } from './components/history-home/history-home.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HistoryFormComponent } from './components/history-form/history-form.component';
import { HistoryDetailComponent } from './components/history-detail/history-detail.component';

@NgModule({
  declarations: [HistoryHomeComponent, HistoryFormComponent, HistoryDetailComponent],
  imports: [
    CommonModule,
    HistoryRoutingModule,
    HttpClientModule,
    SharedModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class HistoryModule {}
