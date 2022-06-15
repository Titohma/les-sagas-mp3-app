import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListSeasonsPageRoutingModule } from './list-episodes-routing.module';

import { ListSeasonsPage } from './list-episodes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListSeasonsPageRoutingModule
  ],
  declarations: [ListSeasonsPage]
})
export class ListSeasonsPageModule {}
