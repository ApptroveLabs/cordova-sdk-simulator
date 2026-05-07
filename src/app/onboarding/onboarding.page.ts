import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EcommerceService } from '../services/ecommerce.service';
import { AppTroveCordovaPlugin, AppTroveEvent } from 'com.apptrove.cordova_sdk/ionic-native/apptrove/ngx';
import { AppTroveEvents } from '../utils/apptrove-events';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {
  features = [
    {
      icon: 'bag-handle-outline',
      title: 'Discover Products',
      description: 'Premium products'
    },
    {
      icon: 'flash-outline',
      title: 'Fast Delivery',
      description: 'Quick checkout'
    },
    {
      icon: 'shield-checkmark-outline',
      title: 'Expert Support',
      description: 'Safe payments'
    }
  ];

  constructor(
    private router: Router,
    private ecommerceService: EcommerceService,
    private apptrove: AppTroveCordovaPlugin
  ) { }

  ngOnInit() { }

  finish() {
    // Track Onboarding Event
    const onboardingEvent = new AppTroveEvent(AppTroveEvents.ONBOARDING); 
    onboardingEvent.setParam1("walkthrough_completed");
    this.apptrove.trackEvent(onboardingEvent);

    this.ecommerceService.setOnboardingSeen(true);
    this.router.navigate(['/login']);
  }
}
