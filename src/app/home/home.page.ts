import { Component, OnInit } from '@angular/core';
import { IonicModule, AlertController, ToastController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { App as CapacitorApp } from '@capacitor/app';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EcommerceService, Product } from '../services/ecommerce.service';
import { AppTroveCordovaPlugin, AppTroveEvent } from 'com.apptrove.cordova_sdk/ionic-native/apptrove/ngx';
import { AppTroveEvents } from '../utils/apptrove-events';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class HomePage implements OnInit {
  displayedProducts: Product[] = [];
  categories: string[] = ['All'];
  selectedCategory: string = 'All';
  searchQuery: string = '';
  cartCount: number = 0;
  lastPressed: number = 0;

  banners = [
    { title: "Winter Sale - 50% Off", image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=2000' },
    { title: "New Arrivals", image: 'https://images.unsplash.com/photo-1607082350899-7e105aa886ae?auto=format&fit=crop&q=80&w=2000' },
    { title: "Exclusive Bundles", image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2000' }
  ];

  constructor(
    private router: Router,
    private platform: Platform,
    private alertController: AlertController,
    private toastController: ToastController,
    private ecommerceService: EcommerceService,
    private apptrove: AppTroveCordovaPlugin,
    private menuController: MenuController
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.ecommerceService.cart$.subscribe(cart => {
      this.cartCount = cart.length;
    });

    this.platform.backButton.subscribeWithPriority(10, () => {
      const now = Date.now();
      if (this.router.url === '/home') {
        if (now - this.lastPressed < 2000) {
          CapacitorApp.exitApp();
        } else {
          this.lastPressed = now;
          this.showToast('Press back again to exit');
        }
      }
    });
  }

  loadProducts() {
    const products = this.ecommerceService.getProducts();
    this.displayedProducts = products;
    const cats = products.map(p => p.category);
    this.categories = ['All', ...new Set(cats)];
  }

  filterProducts() {
    let products = this.ecommerceService.getProducts();
    if (this.selectedCategory !== 'All') {
      products = products.filter(p => p.category === this.selectedCategory);
    }
    if (this.searchQuery) {
      products = products.filter(p => p.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
      // Track Search Event
      const searchEvent = new AppTroveEvent(AppTroveEvents.PRODUCT_SEARCH); 
      searchEvent.setParam1(this.searchQuery);
      this.apptrove.trackEvent(searchEvent);
    }
    this.displayedProducts = products;
  }

  onCategoryChange(category: string) {
    this.selectedCategory = category;
    this.filterProducts();
  }

  async addToCart(product: Product, event: Event) {
    event.stopPropagation();
    this.ecommerceService.addToCart(product);
    
    // Track Add to Cart Event
    const cartEvent = new AppTroveEvent(AppTroveEvents.ADD_TO_CART); 
    cartEvent.setParam1('Product Added to cart');
    cartEvent.setParam2(product.name);
    cartEvent.setProductId(product.id.toString());
    cartEvent.setRevenue(product.price);
    cartEvent.setCurrency("USD");
    this.apptrove.trackEvent(cartEvent);

    const toast = await this.toastController.create({
      message: `${product.name} added to cart`,
      duration: 1000,
      position: 'bottom',
      color: 'success'
    });
    await toast.present();
  }

  async shareProduct(product: Product, event: Event) {
    event.stopPropagation();
    try {
      const dynamicLink = await this.apptrove.createDynamicLink({
        templateId: 'wy23Px',
        link: 'https://trackier58.u9ilnk.me',
        domainUriPrefix: 'trackier58.u9ilnk.me',
        deepLinkValue: 'ProductDetail',
        sdkParameters: {
          'product_id': product.id.toString(),
          'product_name': product.name,
        },
        socialMetaTagParameters: {
          'title': `Cordmarket - ${product.name}`,
          'description': `Check out this premium ${product.name} only for $${product.price.toFixed(2)}!`,
          'imageLink': product.imageUrl,
        },
      });
      
      // Use native share if available
      if (navigator.share) {
        await navigator.share({
          title: product.name,
          text: `Check out this premium ${product.name} on Cordmarket!`,
          url: dynamicLink
        });
      } else {
        await this.copyToClipboard(dynamicLink);
        await this.showToast('Link copied to clipboard!');
      }
    } catch (e) {
      console.error('Error sharing:', e);
    }
  }

  async copyToClipboard(text: string) {
    await navigator.clipboard.writeText(text);
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }

  openDrawer() {
    this.menuController.open('main-menu');
  }

  toggleWishlist(product: Product) {
    this.ecommerceService.toggleWishlist(product);
    this.showToast(`${product.name} ${this.ecommerceService.isInWishlist(product.id) ? 'added to' : 'removed from'} wishlist`);
  }

  goToCart() {
    this.router.navigate(['/add-to-cart-screen']);
  }

  goToWishlist() {
    this.router.navigate(['/wishlist']);
  }

  goToCake() {
    this.router.navigate(['/cake-screen']);
  }

  viewProduct(product: Product) {
    this.router.navigate(['/product-detail', product.id]);
  }
}
