import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppTroveCordovaPlugin, AppTroveEvent } from 'com.apptrove.cordova_sdk/ionic-native/apptrove/ngx';
import { ToastController } from '@ionic/angular';
import { EcommerceService } from '../services/ecommerce.service';
import { AppTroveEvents } from '../utils/apptrove-events';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private apptrove: AppTroveCordovaPlugin,
    private toastController: ToastController,
    private ecommerceService: EcommerceService
  ) { }

  ngOnInit() { }

  async signup() {
    if (this.name && this.email && this.password) {
      // Set identity in SDK
      this.apptrove.setUserName(this.name);
      this.apptrove.setUserEmail(this.email);
      const userId = this.email.split('@')[0];
      this.apptrove.setUserId(userId);

      // Track Registration Event
      const regEvent = new AppTroveEvent(AppTroveEvents.REGISTRATION); 
      regEvent.setParam1(this.email);
      regEvent.setParam2(this.name);
      regEvent.setParam3("organic_signup");
      this.apptrove.trackEvent(regEvent);

      this.ecommerceService.setUserEmail(this.email);
      
      const toast = await this.toastController.create({
        message: 'Account created successfully!',
        duration: 2000,
        color: 'success'
      });
      await toast.present();

      this.router.navigate(['/home']);
    } else {
      const toast = await this.toastController.create({
        message: 'Please fill all fields',
        duration: 2000,
        color: 'danger'
      });
      await toast.present();
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
