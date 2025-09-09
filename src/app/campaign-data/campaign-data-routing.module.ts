import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CampaignDataPage } from './campaign-data.page';

const routes: Routes = [
  {
    path: '',
    component: CampaignDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CampaignDataPageRoutingModule {}
