import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompleteEventPageRoutingModule } from './complete-event-routing.module';

import { CompleteEventPage } from './complete-event.page';
import { AppTroveCordovaPlugin } from 'com.apptrove.cordova_sdk/ionic-native/apptrove/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompleteEventPageRoutingModule
  ],
  declarations: [CompleteEventPage],
  providers: [AppTroveCordovaPlugin]
})
export class CompleteEventPageModule {}
