import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewSagaPageRoutingModule } from './view-saga-routing.module';

import { ViewSagaPage } from './view-saga.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewSagaPageRoutingModule
  ],
  declarations: [ViewSagaPage]
})
export class ViewSagaPageModule {}
