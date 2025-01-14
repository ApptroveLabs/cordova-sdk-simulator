import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddToCartScreenPage } from './add-to-cart-screen.page';

const routes: Routes = [
  {
    path: '',
    component: AddToCartScreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddToCartScreenPageRoutingModule {}
