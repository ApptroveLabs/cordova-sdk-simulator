import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import {
  AppTroveCordovaPlugin,
  AppTroveEvent,
} from 'com.apptrove.cordova_sdk/ionic-native/apptrove/ngx';

@Component({
  selector: 'app-customs-events',
  templateUrl: './customs-events.page.html',
  styleUrls: ['./customs-events.page.scss'],
  imports: [CommonModule, IonicModule, FormsModule],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CustomsEventsPage {
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
  eventId: string = ''; // Corrected variable name
  selectedCurrency: string | null = null;
  revenue: number = 0;
  params: { key: string; value: string }[] = [];

  constructor(
    private apptroveCordovaPlugin: AppTroveCordovaPlugin,
    private location: Location,
    private toastController: ToastController
  ) {}

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

  // Ensure params are valid before submitting
  async submitEvent() {
    console.log('Submitting event...');
    console.log('Event ID:', this.eventId);
    console.log('Selected Currency:', this.selectedCurrency);
    console.log('Revenue:', this.revenue);
    console.log('Parameters:', this.params);

    if (!this.eventId || !this.selectedCurrency || this.revenue <= 0) {
      const toast = await this.toastController.create({
        message: 'Please fill in all required fields.',
        duration: 1000,
        position: 'bottom',
        color: 'danger',
      });
      await toast.present();
      return;
    }

    // Check if any parameters are invalid
    for (const param of this.params) {
      console.log(`Checking param: ${param.key} = ${param.value}`);
      if (!param.key || !param.value) {
        const toast = await this.toastController.create({
          message: 'All parameters must have a key and value.',
          duration: 1000,
          position: 'bottom',
          color: 'danger',
        });
        await toast.present();
        return;
      }
    }

    const apptroveEvent = new AppTroveEvent(this.eventId);

    apptroveEvent.setRevenue(this.revenue);
    apptroveEvent.setCurrency(this.selectedCurrency);
    apptroveEvent.setOrderId('324222233f33');
    apptroveEvent.setEventValue('Event Send', 'To Pannel');
    this.apptroveCordovaPlugin.setUserEmail('Satyam@Apptrove.com');
    this.apptroveCordovaPlugin.setUserId('#jdjdjdjh3');
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
      console.error('Error submitting event:', error);
      const toast = await this.toastController.create({
        message: `Failed to submit event: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
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
