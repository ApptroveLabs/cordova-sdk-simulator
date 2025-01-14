import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuiltInEventsPageRoutingModule } from './built-in-events-routing.module';

import { BuiltInEventsPage } from './built-in-events.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuiltInEventsPageRoutingModule
  ],
})
export class BuiltInEventsPageModule {}
