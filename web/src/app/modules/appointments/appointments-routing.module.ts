import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentHomeComponent } from './components/appointment-home/appointment-home.component';
import { GetAppointmentListResolver } from './resolvers/get-appointment-list.resolver';
import { StockListResolver } from '../stock/resolvers/stock-list.resolver';

const routes: Routes = [
  {
    path: '',
    component: AppointmentHomeComponent,
    resolve: {
      list: GetAppointmentListResolver,
      products: StockListResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppointmentsRoutingModule {}
