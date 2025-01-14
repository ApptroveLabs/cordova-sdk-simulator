import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomsEventsPageRoutingModule } from './customs-events-routing.module';

import { CustomsEventsPage } from './customs-events.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomsEventsPageRoutingModule
  ],
})
export class CustomsEventsPageModule {}
