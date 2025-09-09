import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DynamicLinkPageRoutingModule } from './dynamic-link-routing.module';

import { DynamicLinkPage } from './dynamic-link.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DynamicLinkPageRoutingModule,
    DynamicLinkPage
  ]
})
export class DynamicLinkPageModule {}
