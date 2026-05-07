import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EcommerceService } from '../services/ecommerce.service';
import { AppTroveCordovaPlugin, AppTroveEvent } from 'com.apptrove.cordova_sdk/ionic-native/apptrove/ngx';
import { ToastController } from '@ionic/angular';
import { AppTroveEvents } from '../utils/apptrove-events';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private ecommerceService: EcommerceService,
    private apptrove: AppTroveCordovaPlugin,
    private toastController: ToastController
  ) { }

  ngOnInit() { }

  async login() {
    if (this.email && this.password) {
      // Set identity in SDK
      this.apptrove.setUserEmail(this.email);
      const userId = this.email.split('@')[0];
      this.apptrove.setUserId(userId);

      // Track Login Event
      const loginEvent = new AppTroveEvent(AppTroveEvents.LOGIN); 
      loginEvent.setParam1(this.email);
      loginEvent.setParam2("email_login");
      this.apptrove.trackEvent(loginEvent);

      this.ecommerceService.setUserEmail(this.email);
      this.router.navigate(['/home']);
    } else {
      const toast = await this.toastController.create({
        message: 'Please enter email and password',
        duration: 2000,
        color: 'danger'
      });
      await toast.present();
    }
  }

  async loginAsGuest() {
    this.apptrove.setUserId("guest_user");
    this.apptrove.setUserName("Guest User");
    this.apptrove.setUserEmail("guest@cordmarket.com");
    this.ecommerceService.setUserEmail("guest@cordmarket.com");
    this.router.navigate(['/home']);
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }
}
