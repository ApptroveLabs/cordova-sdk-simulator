import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompleteEventPageRoutingModule } from './complete-event-routing.module';

import { CompleteEventPage } from './complete-event.page';
import { TrackierCordovaPlugin } from 'com.trackier.cordova_sdk/ionic-native/trackier/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompleteEventPageRoutingModule
  ],
  declarations: [CompleteEventPage],
  providers: [TrackierCordovaPlugin]
})
export class CompleteEventPageModule {}
