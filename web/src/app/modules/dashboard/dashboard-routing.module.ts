import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardHomeComponent } from './components/dashboard-home/dashboard-home.component';
import { GetStatsResolver } from './resolvers/get-stats.resolver';
import { GetIncommingAppointmentResolver } from './resolvers/get-incomming-appointment.resolver';
import { GetProductsDashboardResolver } from './resolvers/get-products-dashboard.resolver';

const routes: Routes = [
  {
    path: '',
    component: DashboardHomeComponent,
    resolve: {
      getStats: GetStatsResolver,
      getIncommingAppointments: GetIncommingAppointmentResolver,
      getProducts: GetProductsDashboardResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
