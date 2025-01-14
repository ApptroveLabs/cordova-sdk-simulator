import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CakeScreenPageRoutingModule } from './cake-screen-routing.module';

import { CakeScreenPage } from './cake-screen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CakeScreenPageRoutingModule
  ],
})
export class CakeScreenPageModule {}
