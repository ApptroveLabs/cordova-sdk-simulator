import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EcommerceService, Product } from '../services/ecommerce.service';
import { AppTroveCordovaPlugin, AppTroveEvent } from 'com.apptrove.cordova_sdk/ionic-native/apptrove/ngx';
import { ToastController } from '@ionic/angular';
import { AppTroveEvents } from '../utils/apptrove-events';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {
  product: Product | undefined;
  isInWishlist: boolean = false;
  selectedSize: string = 'M';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ecommerceService: EcommerceService,
    private apptrove: AppTroveCordovaPlugin,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.product = this.ecommerceService.getProductById(parseInt(id));
      if (this.product) {
        this.isInWishlist = this.ecommerceService.isInWishlist(this.product.id);
        // Track Product View Event
        const viewEvent = new AppTroveEvent(AppTroveEvents.PRODUCT_VIEW); 
        viewEvent.setParam1('Product Viewed');
        viewEvent.setParam2(this.product.name);
        viewEvent.setParam3(this.product.category);
        viewEvent.setProductId(this.product.id.toString());
        viewEvent.setOrderId(`VistMarket_${this.product.id}`);
        this.apptrove.trackEvent(viewEvent);
      }
    }
  }

  async addToCart() {
    if (this.product) {
      this.ecommerceService.addToCart(this.product);
      
      // Track Add to Cart Event
      const cartEvent = new AppTroveEvent(AppTroveEvents.ADD_TO_CART); 
      cartEvent.setParam1('Product Added to cart');
      cartEvent.setParam2(this.product.name);
      cartEvent.setProductId(this.product.id.toString());
      cartEvent.setRevenue(this.product.price);
      cartEvent.setCurrency("USD");
      cartEvent.setParam4(this.selectedSize);
      this.apptrove.trackEvent(cartEvent);

      const toast = await this.toastController.create({
        message: `${this.product.name} added to cart`,
        duration: 2000,
        color: 'success'
      });
      await toast.present();
    }
  }

  toggleWishlist() {
    if (this.product) {
      this.isInWishlist = this.ecommerceService.toggleWishlist(this.product);
    }
  }

  async share() {
    if (this.product) {
      try {
        const dynamicLink = await this.apptrove.createDynamicLink({
          templateId: 'wy23Px',
          link: 'https://trackier58.u9ilnk.me',
          domainUriPrefix: 'trackier58.u9ilnk.me',
          deepLinkValue: 'ProductDetail',
          sdkParameters: {
            'product_id': this.product.id.toString(),
            'product_name': this.product.name,
          },
          socialMetaTagParameters: {
            'title': `Cordmarket - ${this.product.name}`,
            'description': `Check out this premium ${this.product.name} only for $${this.product.price.toFixed(2)}!`,
            'imageLink': this.product.imageUrl,
          },
        });
        
        await Share.share({
          title: this.product.name,
          text: `Check out this premium ${this.product.name} on Cordmarket!`,
          url: dynamicLink || 'https://trackier58.u9ilnk.me',
          dialogTitle: `Share ${this.product.name}`,
        });
      } catch (e) {
        console.error('Error sharing:', e);
        // Show a toast if sharing fails
        const toast = await this.toastController.create({
          message: 'Unable to share at this time',
          duration: 2000,
          color: 'warning'
        });
        await toast.present();
      }
    }
  }
}
