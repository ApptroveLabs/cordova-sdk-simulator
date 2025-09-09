import { Component, OnInit } from '@angular/core';
import { TrackierCordovaPlugin, TrackierEvent } from '@awesome-cordova-plugins/trackier/ngx';

@Component({
  selector: 'app-complete-event',
  templateUrl: './complete-event.page.html',
  styleUrls: ['./complete-event.page.scss']
})
export class CompleteEventPage implements OnInit {

  // Event details - now editable by user
  eventDetails = {
    eventId: 'B4N_In4cIP',
    orderId: 'REG_001',
    productId: 'FREE_PLAN',
    currency: 'USD',
    couponCode: '343434234',
    discount: 3.1415,
    revenue: 34234234.32423,
    params: {
      param1: 'Test1',
      param2: 'Test2',
      param3: 'Test3',
      param4: 'Test4',
      param5: 'Test5',
      param6: 'Test6',
      param7: 'Test7',
      param8: 'Test8',
      param9: 'Test9',
      param10: 'Test10'
    } as { [key: string]: string },
    customValues: {
      signup_time: '1631234567890',
      device: 'Cordova',
      Plan: 'FREE_PLAN',
      SignupMethod: 'Email',
      AppVersion: '1.0.0'
    } as { [key: string]: string },
    userDetails: {
      userId: 'USER123',
      email: 'user@example.com',
      name: 'Jane Doe',
      phone: '+1234567890',
      dob: '1990-01-01',
      gender: 'Male'
    }
  };

  isEventSent = false;
  isLoading = false;

  constructor(private trackierCordovaPlugin: TrackierCordovaPlugin) { }

  ngOnInit() {
  }

  // Reset all values to their defaults
  resetToDefaults() {
    this.eventDetails = {
      eventId: 'B4N_In4cIP',
      orderId: 'REG_001',
      productId: 'FREE_PLAN',
      currency: 'USD',
      couponCode: '343434234',
      discount: 3.1415,
      revenue: 34234234.32423,
      params: {
        param1: 'Test1',
        param2: 'Test2',
        param3: 'Test3',
        param4: 'Test4',
        param5: 'Test5',
        param6: 'Test6',
        param7: 'Test7',
        param8: 'Test8',
        param9: 'Test9',
        param10: 'Test10'
      } as { [key: string]: string },
      customValues: {
        signup_time: '1631234567890',
        device: 'Cordova',
        Plan: 'FREE_PLAN',
        SignupMethod: 'Email',
        AppVersion: '1.0.0'
      } as { [key: string]: string },
      userDetails: {
        userId: 'USER123',
        email: 'user@example.com',
        name: 'Jane Doe',
        phone: '+1234567890',
        dob: '1990-01-01',
        gender: 'Male'
      }
    };
    this.isEventSent = false;
  }

  // Helper method to get parameter entries for display
  getParamEntries() {
    return Object.keys(this.eventDetails.params).map(key => ({
      key: key.charAt(0).toUpperCase() + key.slice(1),
      value: this.eventDetails.params[key as keyof typeof this.eventDetails.params]
    }));
  }

  // Helper method to get custom value entries for display
  getCustomValueEntries() {
    return Object.keys(this.eventDetails.customValues).map(key => ({
      key: key,
      value: this.eventDetails.customValues[key as keyof typeof this.eventDetails.customValues]
    }));
  }

  // Demo function to showcase all Trackier SDK event tracking capabilities
  async sendCompleteEvent() {
    try {
      this.isLoading = true;
      this.isEventSent = false;
      
      // Create event with COMPLETE_REGISTRATION ID or Custom Event ID
      var event = new TrackierEvent(this.eventDetails.eventId);

      // Built-in fields for event tracking
      event.setOrderId(this.eventDetails.orderId);
      event.setProductId(this.eventDetails.productId);
      event.setCurrency(this.eventDetails.currency);
      event.setCouponCode(this.eventDetails.couponCode);
      event.setDiscount(this.eventDetails.discount);
      event.setRevenue(this.eventDetails.revenue);

      // Custom parameters for structured data
      event.setParam1(this.eventDetails.params['param1']);
      event.setParam2(this.eventDetails.params['param2']);
      event.setParam3(this.eventDetails.params['param3']);
      event.setParam4(this.eventDetails.params['param4']);
      event.setParam5(this.eventDetails.params['param5']);
      event.setParam6(this.eventDetails.params['param6']);
      event.setParam7(this.eventDetails.params['param7']);
      event.setParam8(this.eventDetails.params['param8']);
      event.setParam9(this.eventDetails.params['param9']);
      event.setParam10(this.eventDetails.params['param10']);

      // Custom key-value pairs for flexible data
      Object.keys(this.eventDetails.customValues).forEach(key => {
        event.setEventValue(key, this.eventDetails.customValues[key as keyof typeof this.eventDetails.customValues]);
      });

      // Set user details in Trackier SDK
      await this.trackierCordovaPlugin.setUserId(this.eventDetails.userDetails.userId);
      await this.trackierCordovaPlugin.setUserEmail(this.eventDetails.userDetails.email);
      await this.trackierCordovaPlugin.setUserName(this.eventDetails.userDetails.name);
      await this.trackierCordovaPlugin.setUserPhone(this.eventDetails.userDetails.phone);
      await this.trackierCordovaPlugin.setDOB(this.eventDetails.userDetails.dob);
      await this.trackierCordovaPlugin.setGender(this.eventDetails.userDetails.gender);

      // Send the event to Apptrove
      this.trackierCordovaPlugin.trackEvent(event);
      
      this.isEventSent = true;
      console.log("Complete event tracked successfully!");
      
    } catch (error) {
      console.error("Error running complete event:", error);
    } finally {
      this.isLoading = false;
    }
  }

}
