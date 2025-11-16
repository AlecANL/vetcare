import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { AppComponent } from './app.component';
import { PermissionsGuard } from './guards/permissions.guard';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
      },
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [PermissionsGuard],
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./modules/dashboard/dashboard.module').then(
                (m) => m.DashboardModule
              ),
          },
          {
            path: 'users',
            loadChildren: () =>
              import('./modules/users/users.module').then((m) => m.UsersModule),
          },
          {
            path: 'appointments',
            loadChildren: () =>
              import('./modules/appointments/appointments.module').then(
                (m) => m.AppointmentsModule
              ),
          },
          {
            path: 'history',
            loadChildren: () =>
              import('./modules/history/history.module').then(
                (m) => m.HistoryModule
              ),
          },
          {
            path: 'stock',
            loadChildren: () =>
              import('./modules/stock/stock.module').then((m) => m.StockModule),
          },
          {
            path: 'invoice',
            loadChildren: () =>
              import('./modules/invoice/invoice.module').then(
                (m) => m.InvoiceModule
              ),
          },
        ],
      },
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
