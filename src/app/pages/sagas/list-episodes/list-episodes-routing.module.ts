import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListSeasonsPage } from './list-episodes.page';

const routes: Routes = [
  {
    path: '',
    component: ListSeasonsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListSeasonsPageRoutingModule {}
