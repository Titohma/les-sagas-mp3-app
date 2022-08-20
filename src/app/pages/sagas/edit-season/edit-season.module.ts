import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditSeasonPageRoutingModule } from './edit-season-routing.module';

import { EditSeasonPage } from './edit-season.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditSeasonPageRoutingModule
  ],
  declarations: [EditSeasonPage]
})
export class EditSeasonPageModule {}
