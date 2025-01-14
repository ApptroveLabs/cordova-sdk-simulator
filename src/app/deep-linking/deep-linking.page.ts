import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { DeepLinkingService } from './deep-linking-service'; // Ensure this service is correctly implemented
import { IonicModule } from '@ionic/angular';
import { Location } from '@angular/common'; // Import Location

@Component({
  standalone: true, // Mark the component as standalone
  selector: 'app-deep-linking',
  templateUrl: './deep-linking.page.html',
  styleUrls: ['./deep-linking.page.scss'],
  imports: [IonicModule], // Allowed because the component is now standalone
})
export class DeepLinkingPage implements OnInit {
  linkMessage: string = 'Waiting for a link...';
  images: string[] = [
    'assets/blueberrycupcake.jpeg',
    'assets/chocochipcupcake.png',
    'assets/vanillaccupake.jpeg',
  ];
  isLinkAvailable: boolean = false;

  constructor(
    private router: Router,
    private deepLinkingService: DeepLinkingService,
    private platform: Platform,
    private location: Location
  ) {}

  ngOnInit() {
    this.platform.ready().then(() => {
      this.initDeepLinkListener();
    });
  }

  // Initialize the deep link listener
  initDeepLinkListener() {
    this.deepLinkingService.listenForDeepLinks().subscribe((link: string | null) => {
      if (link) {
        this.handleDeepLink(link);
      } else {
        this.linkMessage = 'Waiting for a link...';
        this.isLinkAvailable = false;
      }
    });
  }

  // Handle deep link navigation
  handleDeepLink(link: string) {
    this.linkMessage = `Deep Link: ${link}`;
    this.isLinkAvailable = true; // Deep link is available

    try {
      const url = new URL(link); // Parse the deep link URL
      const productId = url.searchParams.get('product_id');
      const quantity = url.searchParams.get('quantity');
      const actionData = url.searchParams.get('actionData');
      const dlv = url.searchParams.get('dlv');

      if (url.pathname === '/d' && productId && quantity) {
        this.router.navigate(['/cake'], {
          queryParams: { productId, quantity, actionData, dlv },
        });
      } else {
        console.warn('Unhandled deep link:', link);
        this.linkMessage = 'Link does not match expected format.';
        this.isLinkAvailable = false;
      }
    } catch (error) {
      console.error('Error handling deep link:', error);
      this.linkMessage = 'Error processing the deep link. Please try again.';
      this.isLinkAvailable = false;
    }
  }

  // Function to navigate back to the previous page
  navigateBack() {
    this.location.back(); // Use location.back() to navigate back
  }
}
