import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CampaignDataPageRoutingModule } from './campaign-data-routing.module';
import { CampaignDataPage } from './campaign-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CampaignDataPageRoutingModule
  ],
  declarations: [CampaignDataPage]
})
export class CampaignDataPageModule {}