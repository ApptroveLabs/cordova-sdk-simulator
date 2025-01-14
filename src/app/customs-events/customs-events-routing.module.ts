import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomsEventsPage } from './customs-events.page';

const routes: Routes = [
  {
    path: '',
    component: CustomsEventsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomsEventsPageRoutingModule {}
