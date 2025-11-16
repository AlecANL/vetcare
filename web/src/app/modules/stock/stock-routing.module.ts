import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockHomeComponent } from './components/stock-home/stock-home.component';
import { StockListResolver } from './resolvers/stock-list.resolver';

const routes: Routes = [
  {
    path: '',
    component: StockHomeComponent,
    resolve: {
      list: StockListResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockRoutingModule {}
