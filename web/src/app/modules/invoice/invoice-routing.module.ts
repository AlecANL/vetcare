import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceHomeComponent } from './components/invoice-home/invoice-home.component';
import { GetInvoiceListResolver } from './resolvers/get-invoice-list.resolver';

const routes: Routes = [
  {
    path: '',
    component: InvoiceHomeComponent,
    resolve: {
      list: GetInvoiceListResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoiceRoutingModule {}
