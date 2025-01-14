import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddToCartScreenPageRoutingModule } from './add-to-cart-screen-routing.module';

import { AddToCartScreenPage } from './add-to-cart-screen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddToCartScreenPageRoutingModule
  ],
})
export class AddToCartScreenPageModule {}
