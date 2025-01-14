import { Component, OnInit } from '@angular/core';
import { CommonModule  } from '@angular/common'; // Import CommonModule
import { IonicModule ,ToastController} from '@ionic/angular'; // Import IonicModule
import { TrackierCordovaPlugin, TrackierConfig, TrackierEnvironment, TrackierEvent } from '@awesome-cordova-plugins/trackier/ngx';
import { Router } from '@angular/router';
import { Location } from '@angular/common'; // Import Location


@Component({
  selector: 'app-add-to-cart-screen',
  templateUrl: './add-to-cart-screen.page.html',
  standalone:true,
  styleUrls: ['./add-to-cart-screen.page.scss'],
  imports: [CommonModule, IonicModule], // Import necessary modulesa
})
export class AddToCartScreenPage implements OnInit {

  constructor(private trackierCordovaPlugin:TrackierCordovaPlugin,private router: Router,private location: Location, private toastController: ToastController) {}

  ngOnInit() {
    var trackierEvent = new TrackierEvent("jKw8qPF50u");
    trackierEvent.setParam1("Ionic Product Viewed");
    this.trackierCordovaPlugin.trackEvent(trackierEvent);
  }

  async purchase() {
    const trackierEvent = new TrackierEvent('Q4YsqBKnzZ');
    trackierEvent.setParam1('Ionic Product Added to cart');
    trackierEvent.setParam2('Param 2');
    trackierEvent.setParam3('Param 3');
    trackierEvent.setParam4('Param 4');
    trackierEvent.setCouponCode('*SDJ(#JKKSH');
    this.trackierCordovaPlugin.setUserId('Satya7893@');
    this.trackierCordovaPlugin.setUserName('SatyamKr');
    this.trackierCordovaPlugin.setUserPhone('3i23u4ueuwruew');
    this.trackierCordovaPlugin.setUserEmail('Satyam@Trackier.com');
    this.trackierCordovaPlugin.trackEvent(trackierEvent);

    // Show a toast message instead of alert
    const toast = await this.toastController.create({
      message: 'Product Purchase Sucessfully',
      duration: 2000, // Duration in ms
      position: 'bottom', // Position of the toast
      color: 'success', // Success color
    });
    await toast.present();

    // Navigate to Add to Cart screen
    this.router.navigate(['/add-to-cart-screen']);
  }

  // Function to navigate back to the previous page
  navigateBack() {
    this.location.back();  // Use location.back() to navigate back
  }

}
