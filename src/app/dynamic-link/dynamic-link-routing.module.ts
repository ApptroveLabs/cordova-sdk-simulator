import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DynamicLinkPage } from './dynamic-link.page';

const routes: Routes = [
  {
    path: '',
    component: DynamicLinkPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DynamicLinkPageRoutingModule {}
