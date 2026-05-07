import { Component, OnInit } from '@angular/core';
import { AppTroveCordovaPlugin, AppTroveEvent } from 'com.apptrove.cordova_sdk/ionic-native/apptrove/ngx';
import { AppTroveEvents } from '../utils/apptrove-events';

interface CampaignData {
  appTroveId: string;
  ad: string;
  adId: string;
  campaign: string;
  campaignId: string;
  adSet: string;
  adSetId: string;
  channel: string;
  p1: string;
  p2: string;
  p3: string;
  p4: string;
  p5: string;
  clickId: string;
  dlv: string;
  pid: string;
  isRetargeting: boolean;
}

@Component({
  selector: 'app-campaign-data',
  templateUrl: './campaign-data.page.html',
  styleUrls: ['./campaign-data.page.scss'],
})
export class CampaignDataPage implements OnInit {
  eventId: string = AppTroveEvents.PRODUCT_SEARCH;
  
  campaignData: CampaignData = {
    appTroveId: '',
    ad: '',
    adId: '',
    campaign: '',
    campaignId: '',
    adSet: '',
    adSetId: '',
    channel: '',
    p1: '',
    p2: '',
    p3: '',
    p4: '',
    p5: '',
    clickId: '',
    dlv: '',
    pid: '',
    isRetargeting: false
  };

  isLoading = false;
  errorMessage = '';

  constructor(private apptroveCordovaPlugin: AppTroveCordovaPlugin) {}

  ngOnInit() {
    console.log('Campaign Data Page initialized');
    // Add a delay to ensure SDK is fully initialized before making calls
    setTimeout(() => {
      this.retrieveCampaignData();
    }, 2000);
  }

  async retrieveCampaignData() {
    this.isLoading = true;
    this.errorMessage = '';

    try {
      console.log('Starting to retrieve campaign data...');

      // Retrieve all campaign data using individual promises
      this.campaignData.appTroveId = await this.getCampaignValue(() => this.apptroveCordovaPlugin.getAppTroveId());
      this.campaignData.ad = await this.getCampaignValue(() => this.apptroveCordovaPlugin.getAd());
      this.campaignData.adId = await this.getCampaignValue(() => this.apptroveCordovaPlugin.getAdID());
      this.campaignData.campaign = await this.getCampaignValue(() => this.apptroveCordovaPlugin.getCampaign());
      this.campaignData.campaignId = await this.getCampaignValue(() => this.apptroveCordovaPlugin.getCampaignID());
      this.campaignData.adSet = await this.getCampaignValue(() => this.apptroveCordovaPlugin.getAdSet());
      this.campaignData.adSetId = await this.getCampaignValue(() => this.apptroveCordovaPlugin.getAdSetID());
      this.campaignData.channel = await this.getCampaignValue(() => this.apptroveCordovaPlugin.getChannel());
      this.campaignData.p1 = await this.getCampaignValue(() => this.apptroveCordovaPlugin.getP1());
      this.campaignData.p2 = await this.getCampaignValue(() => this.apptroveCordovaPlugin.getP2());
      this.campaignData.p3 = await this.getCampaignValue(() => this.apptroveCordovaPlugin.getP3());
      this.campaignData.p4 = await this.getCampaignValue(() => this.apptroveCordovaPlugin.getP4());
      this.campaignData.p5 = await this.getCampaignValue(() => this.apptroveCordovaPlugin.getP5());
      this.campaignData.clickId = await this.getCampaignValue(() => this.apptroveCordovaPlugin.getClickId());
      this.campaignData.dlv = await this.getCampaignValue(() => this.apptroveCordovaPlugin.getDlv());
      this.campaignData.pid = await this.getCampaignValue(() => this.apptroveCordovaPlugin.getPid());
      
      // Handle boolean value for retargeting
      const retargetingValue = await this.getCampaignValue(() => this.apptroveCordovaPlugin.getIsRetargeting());
      this.campaignData.isRetargeting = retargetingValue === 'true';

      console.log('Campaign data retrieved successfully:', this.campaignData);

    } catch (error) {
      console.error('Error retrieving campaign data:', error);
      this.errorMessage = 'Failed to retrieve campaign data. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }

  private async getCampaignValue(method: () => Promise<any>): Promise<string> {
    try {
      const result = await method();
      return result || '';
    } catch (error) {
      console.error('Error getting campaign value:', error);
      // Return empty string for iOS compatibility
      return '';
    }
  }

  async trackEvent() {
    try {
      const apptroveEvent = new AppTroveEvent(this.eventId);
      await this.apptroveCordovaPlugin.trackEvent(apptroveEvent);
      console.log('Event tracked successfully');
    } catch (error) {
      console.error('Error tracking event:', error);
    }
  }

  refreshData() {
    this.retrieveCampaignData();
  }

  copyToClipboard(text: string) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        console.log('Copied to clipboard:', text);
      }).catch(err => {
        console.error('Failed to copy to clipboard:', err);
      });
    }
  }
}
