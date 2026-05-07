import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController, AlertController } from '@ionic/angular';
import { AppTroveCordovaPlugin, AppTroveEvent } from 'com.apptrove.cordova_sdk/ionic-native/apptrove/ngx';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { EcommerceService, Product } from '../services/ecommerce.service';
import { Subscription } from 'rxjs';
import { AppTroveEvents } from '../utils/apptrove-events';

interface CartLineItem {
  product: Product;
  quantity: number;
}

@Component({
  selector: 'app-add-to-cart-screen',
  templateUrl: './add-to-cart-screen.page.html',
  standalone: true,
  styleUrls: ['./add-to-cart-screen.page.scss'],
  imports: [CommonModule, IonicModule],
})
export class AddToCartScreenPage implements OnInit, OnDestroy {
  cartItems: CartLineItem[] = [];
  totalItems: number = 0;
  totalPrice: number = 0;
  private cartSub: Subscription | undefined;

  constructor(
    private apptrove: AppTroveCordovaPlugin,
    private router: Router,
    private location: Location,
    private toastController: ToastController,
    private ecommerceService: EcommerceService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.cartSub = this.ecommerceService.cart$.subscribe(items => {
      const grouped = new Map<number, CartLineItem>();
      for (const item of items) {
        const existing = grouped.get(item.id);
        if (existing) {
          existing.quantity += 1;
        } else {
          grouped.set(item.id, { product: item, quantity: 1 });
        }
      }
      this.cartItems = Array.from(grouped.values());
      this.totalItems = items.length;
      this.totalPrice = this.ecommerceService.getTotalPrice();
    });

    // Track Cart Viewed
    const cartViewEvent = new AppTroveEvent(AppTroveEvents.VIEW_CART);
    cartViewEvent.setParam1("Cart Page Viewed");
    this.apptrove.trackEvent(cartViewEvent);
  }

  ngOnDestroy() {
    if (this.cartSub) this.cartSub.unsubscribe();
  }

  removeItem(product: Product) {
    this.ecommerceService.removeFromCart(product.id);
  }

  async purchase() {
    if (this.cartItems.length === 0) {
      this.showToast('Your cart is empty', 'warning');
      return;
    }

    const alert = await this.alertController.create({
      header: 'Confirm Purchase',
      message: `Total amount: $${this.totalPrice.toFixed(2)}`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Buy Now',
          handler: () => {
            this.completePurchase();
          }
        }
      ]
    });
    await alert.present();
  }

  private async completePurchase() {
    // Track Purchase Event
    const purchaseEvent = new AppTroveEvent(AppTroveEvents.PURCHASE); 
    purchaseEvent.setRevenue(this.totalPrice);
    purchaseEvent.setCurrency("USD");
    purchaseEvent.setParam1("Order Completed");
    this.apptrove.trackEvent(purchaseEvent);

    this.ecommerceService.clearCart();
    
    const toast = await this.toastController.create({
      message: 'Purchase Successful!',
      duration: 2000,
      color: 'success',
    });
    await toast.present();

    this.router.navigate(['/home']);
  }

  private async showToast(message: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color
    });
    await toast.present();
  }

  navigateBack() {
    this.location.back();
  }
}
