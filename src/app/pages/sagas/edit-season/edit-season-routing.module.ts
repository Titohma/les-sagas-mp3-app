import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditSeasonPage } from './edit-season.page';

const routes: Routes = [
  {
    path: '',
    component: EditSeasonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditSeasonPageRoutingModule {}
