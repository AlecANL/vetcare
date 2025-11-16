import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryHomeComponent } from './components/history-home/history-home.component';
import { HistoryListResolver } from './resolvers/history-list.resolver';

const routes: Routes = [
  {
    path: '',
    component: HistoryHomeComponent,
    resolve: {
      list: HistoryListResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoryRoutingModule {}
