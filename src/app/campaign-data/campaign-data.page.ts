import { Component, OnInit } from '@angular/core';
import { TrackierCordovaPlugin, TrackierEvent } from '@awesome-cordova-plugins/trackier/ngx';

interface CampaignData {
  trackierId: string;
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
  
  campaignData: CampaignData = {
    trackierId: '',
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

  constructor(private trackierCordovaPlugin: TrackierCordovaPlugin) {}

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
      this.campaignData.trackierId = await this.getCampaignValue(() => this.trackierCordovaPlugin.getTrackierId());
      this.campaignData.ad = await this.getCampaignValue(() => this.trackierCordovaPlugin.getAd());
      this.campaignData.adId = await this.getCampaignValue(() => this.trackierCordovaPlugin.getAdID());
      this.campaignData.campaign = await this.getCampaignValue(() => this.trackierCordovaPlugin.getCampaign());
      this.campaignData.campaignId = await this.getCampaignValue(() => this.trackierCordovaPlugin.getCampaignID());
      this.campaignData.adSet = await this.getCampaignValue(() => this.trackierCordovaPlugin.getAdSet());
      this.campaignData.adSetId = await this.getCampaignValue(() => this.trackierCordovaPlugin.getAdSetID());
      this.campaignData.channel = await this.getCampaignValue(() => this.trackierCordovaPlugin.getChannel());
      this.campaignData.p1 = await this.getCampaignValue(() => this.trackierCordovaPlugin.getP1());
      this.campaignData.p2 = await this.getCampaignValue(() => this.trackierCordovaPlugin.getP2());
      this.campaignData.p3 = await this.getCampaignValue(() => this.trackierCordovaPlugin.getP3());
      this.campaignData.p4 = await this.getCampaignValue(() => this.trackierCordovaPlugin.getP4());
      this.campaignData.p5 = await this.getCampaignValue(() => this.trackierCordovaPlugin.getP5());
      this.campaignData.clickId = await this.getCampaignValue(() => this.trackierCordovaPlugin.getClickId());
      this.campaignData.dlv = await this.getCampaignValue(() => this.trackierCordovaPlugin.getDlv());
      this.campaignData.pid = await this.getCampaignValue(() => this.trackierCordovaPlugin.getPid());
      
      // Handle boolean value for retargeting
      const retargetingValue = await this.getCampaignValue(() => this.trackierCordovaPlugin.getIsRetargeting());
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
      const trackierEvent = new TrackierEvent("1CFfUn3xEY");
      await this.trackierCordovaPlugin.trackEvent(trackierEvent);
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