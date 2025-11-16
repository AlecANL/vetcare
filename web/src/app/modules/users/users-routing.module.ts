import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { UserListResolver } from './resolvers/user-list.resolver';

const routes: Routes = [
  {
    path: '',
    component: UserHomeComponent,
    resolve: {
      userList: UserListResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
