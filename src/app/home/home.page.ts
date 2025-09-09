import { Component, OnInit } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Router, ActivatedRoute } from '@angular/router';  // Import Router and ActivatedRoute to navigate and check the current route
import { Platform } from '@ionic/angular';
import { App as CapacitorApp } from '@capacitor/app'; // Import the App plugin from Capacitor

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule]  // Add IonicModule to imports array
})
export class HomePage implements OnInit {

  constructor(
    private splashScreen: SplashScreen,
    private router: Router,
    private platform: Platform,
    private alertController: AlertController,
    private activatedRoute: ActivatedRoute  // Inject ActivatedRoute to check the current route
  ) {
    // Hide the splash screen after 2 seconds
    setTimeout(() => {
      this.splashScreen.hide();
    }, 2000);
  }

  ngOnInit() {
    // Handle device back button press
    this.platform.backButton.subscribeWithPriority(10, () => {
      const currentRoute = this.router.url; // Get the current route
      if (currentRoute === '/home') {
        // If the user is on the Home screen, show the exit confirmation
        this.showExitConfirmation();
      } else {
        // Otherwise, go back to the previous screen
        this.router.navigate([currentRoute]);
      }
    });
  }

  // Show an alert to confirm exit with a custom design
  async showExitConfirmation() {
    const alert = await this.alertController.create({
      header: 'Exit App',
      message: 'Are you sure you want to exit?',
      cssClass: 'exit-alert',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary cancel-btn',
          handler: () => {
            console.log('User cancelled exit');
          }
        },
        {
          text: 'Exit',
          handler: () => {
            console.log('User confirmed exit');
            CapacitorApp.exitApp();  // Exit the app
          },
          cssClass: 'exit-btn',
        }
      ]
    });

    await alert.present();
  }

  // Method to handle button click and navigation
  onButtonClick(buttonName: string) {
    console.log(`${buttonName} clicked!`);

    // Navigation logic based on button clicked
    if (buttonName === 'Built-in events') {
      this.router.navigate(['/built-in-events']);
    } else if (buttonName === 'Customs Events') {
      this.router.navigate(['/customs-events']);
    } else if (buttonName === 'Deep linking Page') {
      this.router.navigate(['/deep-linking']);
    } else if (buttonName === 'Product Page') {
      this.router.navigate(['/product-page']);
    } else if (buttonName === 'Dynamic Links') {
      this.router.navigate(['/dynamic-link']);
    } else if (buttonName === 'Complete Event') {
      console.log('Complete Event button clicked - attempting navigation...');
      this.router.navigate(['/complete-event']).then(success => {
        console.log('Complete Event navigation success:', success);
      }).catch(error => {
        console.error('Complete Event navigation error:', error);
      });
    } else if (buttonName === 'Campaign Data') {
      console.log('Campaign Data button clicked - attempting navigation...');
      this.router.navigate(['/campaign-data']).then(success => {
        console.log('Campaign Data navigation success:', success);
      }).catch(error => {
        console.error('Campaign Data navigation error:', error);
      });
    }
  }
}
