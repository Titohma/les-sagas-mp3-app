import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewSagaPage } from './view-saga.page';

const routes: Routes = [
  {
    path: '',
    component: ViewSagaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewSagaPageRoutingModule {}
