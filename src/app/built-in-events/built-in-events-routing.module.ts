import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuiltInEventsPage } from './built-in-events.page';

const routes: Routes = [
  {
    path: '',
    component: BuiltInEventsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuiltInEventsPageRoutingModule {}
