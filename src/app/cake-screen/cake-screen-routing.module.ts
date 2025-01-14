import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CakeScreenPage } from './cake-screen.page';

const routes: Routes = [
  {
    path: '',
    component: CakeScreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CakeScreenPageRoutingModule {}
