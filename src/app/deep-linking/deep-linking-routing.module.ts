import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeepLinkingPage } from './deep-linking.page';

const routes: Routes = [
  {
    path: '',
    component: DeepLinkingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeepLinkingPageRoutingModule {}
