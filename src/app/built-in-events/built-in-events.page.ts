import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';

import {
  TrackierCordovaPlugin,
  TrackierEvent,
} from '@awesome-cordova-plugins/trackier/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-built-in-events',
  templateUrl: './built-in-events.page.html',
  styleUrls: ['./built-in-events.page.scss'],
  imports: [CommonModule, FormsModule, IonicModule],
  standalone: true,
})
export class BuiltInEventsPage {
  eventsList = [
    'ADD_TO_CART',
    'LEVEL_ACHIEVED',
    'ADD_TO_WISHLIST',
    'COMPLETE_REGISTRATION',
    'TUTORIAL_COMPLETION',
    'PURCHASE',
    'SUBSCRIBE',
    'START_TRIAL',
    'ACHIEVEMENT_UNLOCKED',
    'CONTENT_VIEW',
    'TRAVEL_BOOKING',
    'SHARE',
    'INVITE',
    'LOGIN',
    'UPDATE',
  ];
  currencyList = [
    'USD',
    'EUR',
    'GBP',
    'INR',
    'AUD',
    'CAD',
    'SGD',
    'CHF',
    'MYR',
    'JPY',
  ];

  selectedEvent: string | null = null;
  selectedCurrency: string | null = null;
  revenue: number = 0;
  params: { key: string; value: string }[] = [];

  constructor(
    private trackierCordovaPlugin: TrackierCordovaPlugin,
    private alertController: AlertController,
    private location: Location,
    private toastController: ToastController
  ) { }

  async addParam() {
    if (this.params.length < 10) {
      this.params.push({ key: `Param ${this.params.length + 1}`, value: '' });
    } else {
      const toast = await this.toastController.create({
        message: 'You can only add up to 10 parameters.',
        duration: 1000,
        position: 'bottom',
        color: 'danger',
      });
      await toast.present();
    }
  }

  removeParam(index: number) {
    this.params.splice(index, 1);
  }

  async submitEvent() {
    if (!this.selectedEvent || !this.selectedCurrency || this.revenue <= 0) {
      const toast = await this.toastController.create({
        message: 'Please fill in all required fields.',
        duration: 1000,
        position: 'bottom',
        color: 'danger',
      });
      await toast.present();
      return;
    }

    let trackierEvent: TrackierEvent | null = null;

    switch (this.selectedEvent) {
      case 'ADD_TO_CART':
        trackierEvent = new TrackierEvent('Fy4uC1_FlN');
        break;
      case 'LEVEL_ACHIEVED':
        trackierEvent = new TrackierEvent('1CFfUn3xEY');
        break;
      case 'ADD_TO_WISHLIST':
        trackierEvent = new TrackierEvent('AOisVC76YG');
        break;
      case 'COMPLETE_REGISTRATION':
        trackierEvent = new TrackierEvent('mEqP4aD8dU');
        break;
      case 'TUTORIAL_COMPLETION':
        trackierEvent = new TrackierEvent('99VEGvXjN7');
        break;
      case 'PURCHASE':
        trackierEvent = new TrackierEvent('Q4YsqBKnzZ');
        break;
      case 'SUBSCRIBE':
        trackierEvent = new TrackierEvent('B4N_In4cIP');
        break;
      case 'START_TRIAL':
        trackierEvent = new TrackierEvent('jYHcuyxWUW');
        break;
      case 'ACHIEVEMENT_UNLOCKED':
        trackierEvent = new TrackierEvent('xTPvxWuNqm');
        break;
      case 'CONTENT_VIEW':
        trackierEvent = new TrackierEvent('Jwzois1ays');
        break;
      case 'TRAVEL_BOOKING':
        trackierEvent = new TrackierEvent('yP1-ipVtHV');
        break;
      case 'SHARE':
        trackierEvent = new TrackierEvent('dxZXGG1qqL');
        break;
      case 'INVITE':
        trackierEvent = new TrackierEvent('7lnE3OclNT');
        break;
      case 'LOGIN':
        trackierEvent = new TrackierEvent('o91gt1Q0PK');
        break;
      case 'UPDATE':
        trackierEvent = new TrackierEvent('sEQWVHGThl');
        break;
      default:
        const toast = await this.toastController.create({
          message: 'Invalid event selected.',
          duration: 1000,
          position: 'bottom',
          color: 'danger',
        });
        await toast.present();
        return;
    }

    trackierEvent.setRevenue(this.revenue);
    trackierEvent.setCurrency(this.selectedCurrency);


    trackierEvent.setCouponCode("SatyamTest10233");
    this.trackierCordovaPlugin.setUserId("Satyan!232");
    this.trackierCordovaPlugin.setUserName("Satyam");
    this.trackierCordovaPlugin.setUserPhone("82528978393");
    this.trackierCordovaPlugin.setUserEmail("Satyam@gmail.com");
    this.trackierCordovaPlugin.setDOB("12/1/2022");
    this.trackierCordovaPlugin.setGender("Male");
    // Dynamically assign parameters using a switch case for param1, param2, ..., param10
    const paramValues = this.params.map((param) => param.value);
    console.log('Parameter Values:', paramValues);

    for (let i = 0; i < paramValues.length; i++) {
      switch (i) {
        case 0:
          trackierEvent.setParam1(paramValues[i]);
          break;
        case 1:
          trackierEvent.setParam2(paramValues[i]);
          break;
        case 2:
          trackierEvent.setParam3(paramValues[i]);
          break;
        case 3:
          trackierEvent.setParam4(paramValues[i]);
          break;
        case 4:
          trackierEvent.setParam5(paramValues[i]);
          break;
        case 5:
          trackierEvent.setParam6(paramValues[i]);
          break;
        case 6:
          trackierEvent.setParam7(paramValues[i]);
          break;
        case 7:
          trackierEvent.setParam8(paramValues[i]);
          break;
        case 8:
          trackierEvent.setParam9(paramValues[i]);
          break;
        case 9:
          trackierEvent.setParam10(paramValues[i]);
          break;
        default:
          console.error('Too many parameters!');
          break;
      }
    }

    try {
      await this.trackierCordovaPlugin.trackEvent(trackierEvent);
      const toast = await this.toastController.create({
        message: 'Event submitted successfully!',
        duration: 2000,
        position: 'bottom',
        color: 'success',
      });
      await toast.present();
    } catch (error) {
      const toast = await this.toastController.create({
        message: `Failed to submit event: ${error instanceof Error ? error.message : 'Unknown error'}`,
        duration: 2000,
        position: 'bottom',
        color: 'danger',
      });
      await toast.present();
    }
  }

  navigateBack() {
    this.location.back();
  }
}
