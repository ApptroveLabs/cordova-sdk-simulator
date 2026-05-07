import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';

import {
  AppTroveCordovaPlugin,
  AppTroveEvent,
} from 'com.apptrove.cordova_sdk/ionic-native/apptrove/ngx';
import { AlertController } from '@ionic/angular';
import { AppTroveEvents } from '../utils/apptrove-events';

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
    'USD', 'EUR', 'GBP', 'INR', 'AUD', 'CAD', 'SGD', 'CHF', 'MYR', 'JPY',
    'ARS', 'BHD', 'BWP', 'BRL', 'BND', 'BGN', 'CLP', 'COP', 'HRK', 'CZK',
    'DKK', 'AED', 'HKD', 'HUF', 'ISK', 'IDR', 'ILS', 'KZT', 'KWD', 'LYD',
    'MUR', 'MXN', 'NPR', 'NZD', 'NOK', 'OMR', 'PKR', 'PHP', 'PLN', 'RUB',
    'RON', 'SAR', 'ZAR', 'KRW', 'LKR', 'SEK', 'TWD', 'THB', 'TTD', 'TRY',
    'VEF', 'ZMW', 'YER', 'XPF', 'VND', 'VES',
  ];
  selectedEvent: string | null = null;
  selectedCurrency: string | null = null;
  revenue: number = 0;
  params: { key: string; value: string }[] = [];

  constructor(
    private apptroveCordovaPlugin: AppTroveCordovaPlugin,
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

    let apptroveEvent: AppTroveEvent | null = null;

    switch (this.selectedEvent) {
      case 'ADD_TO_CART':
        apptroveEvent = new AppTroveEvent(AppTroveEvents.ADD_TO_CART);
        break;
      case 'LEVEL_ACHIEVED':
        apptroveEvent = new AppTroveEvent(AppTroveEvents.LEVEL_ACHIEVED);
        break;
      case 'ADD_TO_WISHLIST':
        apptroveEvent = new AppTroveEvent(AppTroveEvents.ADD_TO_WISHLIST);
        break;
      case 'COMPLETE_REGISTRATION':
        apptroveEvent = new AppTroveEvent(AppTroveEvents.COMPLETE_REGISTRATION);
        break;
      case 'TUTORIAL_COMPLETION':
        apptroveEvent = new AppTroveEvent(AppTroveEvents.TUTORIAL_COMPLETION);
        break;
      case 'PURCHASE':
        apptroveEvent = new AppTroveEvent(AppTroveEvents.PURCHASE);
        break;
      case 'SUBSCRIBE':
        apptroveEvent = new AppTroveEvent(AppTroveEvents.SUBSCRIBE);
        break;
      case 'START_TRIAL':
        apptroveEvent = new AppTroveEvent(AppTroveEvents.START_TRIAL);
        break;
      case 'ACHIEVEMENT_UNLOCKED':
        apptroveEvent = new AppTroveEvent(AppTroveEvents.ACHIEVEMENT_UNLOCKED);
        break;
      case 'CONTENT_VIEW':
        apptroveEvent = new AppTroveEvent(AppTroveEvents.CONTENT_VIEW);
        break;
      case 'TRAVEL_BOOKING':
        apptroveEvent = new AppTroveEvent(AppTroveEvents.TRAVEL_BOOKING);
        break;
      case 'SHARE':
        apptroveEvent = new AppTroveEvent(AppTroveEvents.SHARE);
        break;
      case 'INVITE':
        apptroveEvent = new AppTroveEvent(AppTroveEvents.INVITE);
        break;
      case 'LOGIN':
        apptroveEvent = new AppTroveEvent(AppTroveEvents.LOGIN);
        break;
      case 'UPDATE':
        apptroveEvent = new AppTroveEvent(AppTroveEvents.UPDATE);
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

    apptroveEvent.setRevenue(this.revenue);
    apptroveEvent.setCurrency(this.selectedCurrency);
    apptroveEvent.setOrderId('324222233f33');
    apptroveEvent.setEventValue('Event Send', 'To Pannel');

    this.apptroveCordovaPlugin.setUserEmail('Satyam@Apptrove.com');
    this.apptroveCordovaPlugin.setUserId('###Uy_eeGu');
    this.apptroveCordovaPlugin.setUserName('Satyam Jha');
    this.apptroveCordovaPlugin.setUserPhone('8252786821');
    this.apptroveCordovaPlugin.setGender('Male');
    // Dynamically assign parameters using a switch case for param1, param2, ..., param10
    const paramValues = this.params.map((param) => param.value);
    console.log('Parameter Values:', paramValues);

    for (let i = 0; i < paramValues.length; i++) {
      switch (i) {
        case 0:
          apptroveEvent.setParam1(paramValues[i]);
          break;
        case 1:
          apptroveEvent.setParam2(paramValues[i]);
          break;
        case 2:
          apptroveEvent.setParam3(paramValues[i]);
          break;
        case 3:
          apptroveEvent.setParam4(paramValues[i]);
          break;
        case 4:
          apptroveEvent.setParam5(paramValues[i]);
          break;
        case 5:
          apptroveEvent.setParam6(paramValues[i]);
          break;
        case 6:
          apptroveEvent.setParam7(paramValues[i]);
          break;
        case 7:
          apptroveEvent.setParam8(paramValues[i]);
          break;
        case 8:
          apptroveEvent.setParam9(paramValues[i]);
          break;
        case 9:
          apptroveEvent.setParam10(paramValues[i]);
          break;
        default:
          console.error('Too many parameters!');
          break;
      }
    }

    try {
      await this.apptroveCordovaPlugin.trackEvent(apptroveEvent);
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
