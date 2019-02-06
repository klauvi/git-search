import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './containers/search/search.component';
import { UsersComponent } from './containers/users/users.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: SearchComponent },
  { path: 'users', component: UsersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
