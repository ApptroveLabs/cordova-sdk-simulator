import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { DeepLinkingPageRoutingModule } from './deep-linking-routing.module';

import { DeepLinkingPage } from './deep-linking.page';

@NgModule({
  
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeepLinkingPageRoutingModule
  ],
})
export class DeepLinkingPageModule {}
